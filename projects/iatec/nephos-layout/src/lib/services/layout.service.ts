import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export type ColorScheme = 'light' | 'dark' | 'dim';

export interface LayoutConfig {
    inputStyle?: string;
    preset?: string;
    primary?: string;
    surface?: string | undefined | null;
    ripple?: boolean;
    darkTheme?: boolean;
    menuMode?: string;
    menuTheme?: string;
    colorScheme?: ColorScheme;
}

interface LayoutState {
    staticMenuInactive?: boolean;
    overlayMenuActive?: boolean;
    profileSidebarVisible?: boolean;
    configSidebarVisible?: boolean;
    mobileMenuActive?: boolean;
    searchBarActive?: boolean;
    sidebarExpanded?: boolean;
    menuHoverActive?: boolean;
    activePath?: any;
    anchored?: boolean;
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
    _config: LayoutConfig = {
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
        staticMenuInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        mobileMenuActive: false,
        sidebarExpanded: false,
        menuHoverActive: false,
        activePath: null,
        anchored: false,
    };

    profile = signal<Profile>({});

    layoutConfig = signal<LayoutConfig>(this._config);

    layoutState = signal<LayoutState>(this._state);

    router = inject(Router);

    isDarkTheme = computed(() => this.layoutConfig().darkTheme);

    isSlim = computed(() => this.layoutConfig().menuMode === 'slim');

    isSlimPlus = computed(() => this.layoutConfig().menuMode === 'slim-plus');

    isHorizontal = computed(() => this.layoutConfig().menuMode === 'horizontal');

    isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

    hasOverlaySubmenu = computed(() => this.isSlim() || this.isSlimPlus() || this.isHorizontal());

    hasOpenOverlay = computed(() => this.layoutState().overlayMenuActive || this.hasOpenOverlaySubmenu());

    hasOpenOverlaySubmenu = computed(() => {
        return this.hasOverlaySubmenu() && !!this.layoutState().activePath;
    });

    isSidebarStateChanged = computed(() => {
        const layoutConfig = this.layoutConfig();
        return layoutConfig.menuMode === 'horizontal' || layoutConfig.menuMode === 'slim' || layoutConfig.menuMode === 'slim-plus';
    });

    transitionComplete = signal<boolean>(false);

    private configUpdate = new Subject<LayoutConfig>();
    configUpdate$ = this.configUpdate.asObservable();
    private overlayOpen = new Subject<any>();
    overlayOpen$ = this.overlayOpen.asObservable();
    private menuSource = new Subject<MenuChangeEvent>();
    menuSource$ = this.menuSource.asObservable();
    private resetSource = new Subject();
    resetSource$ = this.resetSource.asObservable();

    private initialized = false;
    private previousMenuMode: string | undefined = undefined;

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
            this.updateMenuState();
        });
    }

    toggleDarkMode(config?: LayoutConfig): void {
        const _config = config || this.layoutConfig();
        if (_config.darkTheme) {
            document.documentElement.classList.add('app-dark');
        } else {
            document.documentElement.classList.remove('app-dark');
        }
    }

    changeMenuMode(mode: string) {
        this.layoutConfig.update((prev) => ({ ...prev, menuMode: mode }));
        this.layoutState.update((prev) => ({
            ...prev,
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            sidebarExpanded: false,
            menuHoverActive: false,
            anchored: false,
        }));

        if (this.isDesktop()) {
            this.layoutState.update((prev) => ({ ...prev, activePath: this.hasOverlaySubmenu() ? null : this.router.url }));
        }
    }

    toggleMenu() {
        if (this.isDesktop()) {
            if (this.layoutConfig().menuMode === 'static') {
                this.layoutState.update((prev) => ({ ...prev, staticMenuInactive: !prev.staticMenuInactive }));
            }

            if (this.layoutConfig().menuMode === 'overlay') {
                this.layoutState.update((prev) => ({ ...prev, overlayMenuActive: !prev.overlayMenuActive }));
            }
        } else {
            this.layoutState.update((prev) => ({ ...prev, mobileMenuActive: !prev.mobileMenuActive }));
        }
    }

    toggleProfileSidebar() {
        this.layoutState.update((prev) => ({
            ...prev,
            profileSidebarVisible: !prev.profileSidebarVisible,
        }));
    }

    toggleConfigSidebar() {
        this.layoutState.update((prev) => ({
            ...prev,
            configSidebarVisible: !prev.configSidebarVisible,
        }));
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    private updateMenuState() {
        const menuMode = this.layoutConfig().menuMode;
        if (this.previousMenuMode === undefined) {
            this.previousMenuMode = menuMode;
            return;
        }

        if (this.previousMenuMode === menuMode) {
            return;
        }

        this.previousMenuMode = menuMode;

        const isOverlaySubmenu = menuMode === 'slim' || menuMode === 'slim-plus' || menuMode === 'horizontal';

        this.layoutState.update((prev) => ({
            ...prev,
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            sidebarExpanded: false,
            menuHoverActive: false,
            anchored: false,
            activePath: this.isDesktop() ? (isOverlaySubmenu ? null : this.router.url) : prev.activePath,
        }));
    }

    private handleDarkModeTransition(config: LayoutConfig): void {
        const supportsViewTransition = 'startViewTransition' in document;

        if (supportsViewTransition) {
            this.startViewTransition(config);
        } else {
            this.toggleDarkMode(config);
            this.onTransitionEnd();
        }
    }

    private startViewTransition(config: LayoutConfig): void {
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

    onConfigUpdate() {
        this._config = { ...this.layoutConfig() };
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

    hideConfigSidebar() {
        this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: false }));
    }
}
