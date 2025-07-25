import {computed, effect, Injectable, signal} from '@angular/core';
import {Subject} from 'rxjs';

export type ColorScheme = 'light' | 'dark' | 'dim';

export interface layoutConfig {
    inputStyle: string;
    preset?: string;
    primary?: string;
    surface?: string | undefined | null;
    ripple: boolean;
    darkTheme?: boolean;
    menuMode?: string;
    menuTheme?: string;
    colorScheme?: ColorScheme;
}

interface LayoutState {
    staticMenuDesktopInactive?: boolean;
    overlayMenuActive?: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive?: boolean;
    menuHoverActive?: boolean;
    profileSidebarVisible: boolean;
    sidebarActive: boolean;
    anchored: boolean;
    overlaySubmenuActive: boolean;
    activeMenuItem: any;
}

interface MenuChangeEvent {
    key: string;
    routeEvent?: boolean;
}

export interface Profile {
    urlAvatar?: string | undefined;
    name?: string | undefined;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    _config: layoutConfig = {
        ripple: false,
        preset: 'Lara',
        primary: 'noir',
        inputStyle: 'outlined',
        surface: null,
        darkTheme: false,
        menuMode: 'static',
        menuTheme: 'colorScheme',
    };

    _state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        sidebarActive: false,
        anchored: false,
        overlaySubmenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        activeMenuItem: null,
    };

    profile = signal<Profile>({});

    layoutConfig = signal<layoutConfig>(this._config);

    layoutState = signal<LayoutState>(this._state);
    isDarkTheme = computed(() => this.layoutConfig().darkTheme);
    isSlim = computed(() => this.layoutConfig().menuMode === 'slim');
    isSlimPlus = computed(() => this.layoutConfig().menuMode === 'slim-plus');
    isHorizontal = computed(
        () => this.layoutConfig().menuMode === 'horizontal',
    );
    isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');
    transitionComplete = signal<boolean>(false);
    isSidebarStateChanged = computed(() => {
        const layoutConfig = this.layoutConfig();
        return layoutConfig.menuMode === 'horizontal' || layoutConfig.menuMode === 'slim' || layoutConfig.menuMode === 'slim-plus';
    });
    private configUpdate = new Subject<layoutConfig>();
    configUpdate$ = this.configUpdate.asObservable();
    private overlayOpen = new Subject<any>();
    overlayOpen$ = this.overlayOpen.asObservable();
    private menuSource = new Subject<MenuChangeEvent>();
    menuSource$ = this.menuSource.asObservable();
    private resetSource = new Subject();
    resetSource$ = this.resetSource.asObservable();
    private initialized = false;

    constructor() {
        effect(() => {
            const config = this.layoutConfig();
            if (config) {
                this.onConfigUpdate();
            }
        });

        effect(() => {
            const config = this.layoutConfig();

            if (!this.initialized || !config) {
                this.initialized = true;
                return;
            }

            this.handleDarkModeTransition(config);
        });

        effect(() => {
            this.isSidebarStateChanged() && this.reset();
        });

        effect(() => {
            this.toggleDarkMode();
        });

        this.loadDarkModeUserPreference();
    }

    toggleDarkMode(config?: layoutConfig): void {
        const _config = config || this.layoutConfig();
        if (_config.darkTheme) {
            document.documentElement.classList.add('app-dark');
            localStorage.setItem('nph:darkMode', 'true');
        } else {
            document.documentElement.classList.remove('app-dark');
            localStorage.setItem('nph:darkMode', 'false');
        }
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.layoutState.update((prev) => ({...prev, overlayMenuActive: !this.layoutState().overlayMenuActive}));

            if (this.layoutState().overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.layoutState.update((prev) => ({
                ...prev,
                staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive
            }));
        } else {
            this.layoutState.update((prev) => ({
                ...prev,
                staticMenuMobileActive: !this.layoutState().staticMenuMobileActive
            }));

            if (this.layoutState().staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    onConfigUpdate() {
        this._config = {...this.layoutConfig()};
        this.configUpdate.next(this.layoutConfig());
    }

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }

    onOverlaySubmenuOpen() {
        this.overlayOpen.next(null);
    }

    showProfileSidebar() {
        this.layoutState.update((state) => ({
            ...state,
            profileSidebarVisible: true,
        }));
    }

    showConfigSidebar() {
        this.layoutState.update((state) => ({
            ...state,
            configSidebarVisible: true,
        }));
    }

    hideConfigSidebar() {
        this.layoutState.update((prev) => ({...prev, configSidebarVisible: false}));
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    private loadDarkModeUserPreference(): void {
        const mode = localStorage.getItem('nph:darkMode');
        if (mode) {
            this.layoutConfig.update((prev) => ({
                ...prev,
                darkTheme: mode === 'true',
            }));
        }
    }

    private handleDarkModeTransition(config: layoutConfig): void {
        const supportsViewTransition = 'startViewTransition' in document;

        if (supportsViewTransition) {
            this.startViewTransition(config);
        } else {
            this.toggleDarkMode(config);
            this.onTransitionEnd();
        }
    }

    private startViewTransition(config: layoutConfig): void {
        const transition = (document as any).startViewTransition(() => {
            this.toggleDarkMode(config);
        });

        transition.ready
            .then(() => {
                this.onTransitionEnd();
            })
            .catch(() => {
            });
    }

    private onTransitionEnd() {
        this.transitionComplete.set(true);
        setTimeout(() => {
            this.transitionComplete.set(false);
        });
    }
}
