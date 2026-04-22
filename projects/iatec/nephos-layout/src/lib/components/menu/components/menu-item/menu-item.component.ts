import {
    AfterViewInit,
    Component,
    computed,
    effect,
    ElementRef,
    HostBinding,
    inject,
    Input,
    OnDestroy,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {LayoutService} from '../../../../services';
import {DomHandler} from 'primeng/dom';
import {NgClass, NgIf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {Ripple} from 'primeng/ripple';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
    selector: '[nph-layout-menu-item]',
    templateUrl: 'menu-item.component.html',
    imports: [TranslocoPipe, NgClass, NgIf, Tooltip, RouterLinkActive, RouterLink, Ripple],
    host: {
        '[class.active-menuitem]': 'active',
    },
})
export class MenuItemComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() item: any;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    @ViewChild('submenu') submenu!: ElementRef;

    layoutService = inject(LayoutService);
    router = inject(Router);

    active = false;
    menuSourceSubscription!: Subscription;
    menuResetSubscription!: Subscription;
    key: string = '';

    initialized = signal<boolean>(false);

    isSlim = computed(() => this.layoutService.isSlim());
    isSlimPlus = computed(() => this.layoutService.isSlimPlus());
    isHorizontal = computed(() => this.layoutService.isHorizontal());

    isTooltipDisabled = computed(() => {
        return !((this.layoutService.isSlim() || this.layoutService.isSlimPlus()) && this.root && !this.active);
    });

    constructor() {
        this.menuSourceSubscription = this.layoutService.menuSource$.subscribe((value) => {
            Promise.resolve(null).then(() => {
                if (this.layoutService.hasOverlaySubmenu() && this.layoutService.isDesktop()) {
                    return;
                }

                if (value.routeEvent) {
                    this.active = value.key === this.key || value.key?.startsWith(this.key + '-');
                } else {
                    if (value.key !== this.key && !value.key?.startsWith(this.key + '-')) {
                        this.active = false;
                    }
                }
            });
        });

        this.menuResetSubscription = this.layoutService.resetSource$.subscribe(() => {
            this.active = false;
        });
    }

    get hasChildren() {
        return this.item?.items && this.item.items.length > 0;
    }

    get fullPath() {
        const itemPath = this.item?.path || this.item?.routerLink?.[0];
        if (!itemPath) return this.parentKey;
        const parent = this.parentKey;
        if (parent && !itemPath.startsWith(parent)) {
            return parent + itemPath;
        }
        return itemPath;
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (this.item.routerLink && !this.hasChildren) {
            this.updateActiveStateFromRoute();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized.set(true);
        });
    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.routerLink[0], {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored',
        });

        if (activeRoute) {
            this.active = true;
            this.layoutService.onMenuStateChange({
                key: this.key,
                routeEvent: true,
            });
        }
    }

    calculatePosition(overlay: HTMLElement, target: HTMLElement) {
        if (overlay) {
            const {left, top} = target.getBoundingClientRect();
            const [vWidth, vHeight] = [window.innerWidth, window.innerHeight];
            const [oWidth, oHeight] = [overlay.offsetWidth, overlay.offsetHeight];
            const scrollbarWidth = DomHandler.calculateScrollbarWidth();
            overlay.style.top = '';
            overlay.style.left = '';

            if (this.layoutService.isHorizontal()) {
                const width = left + oWidth + scrollbarWidth;
                overlay.style.left = vWidth < width ? `${left - (width - vWidth)}px` : `${left}px`;
            } else if (this.layoutService.isSlim() || this.layoutService.isSlimPlus()) {
                const height = top + oHeight;
                overlay.style.top = vHeight < height ? `${top - (height - vHeight)}px` : `${top}px`;
            }
        }
    }

    itemClick(event: Event) {
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        if (this.hasChildren) {
            if (this.active) {
                // already active, deactivate
                this.active = false;
                this.layoutService.layoutState.update((val) => ({
                    ...val,
                    activePath: null,
                    menuHoverActive: false,
                }));
            } else {
                // activate
                this.active = true;
                this.layoutService.layoutState.update((val) => ({
                    ...val,
                    activePath: this.fullPath || null,
                    menuHoverActive: true,
                }));
            }

            if (this.root && this.active && (this.isSlim() || this.isHorizontal() || this.isSlimPlus())) {
                this.layoutService.onOverlaySubmenuOpen();
            }
        } else {
            this.active = false;
            this.layoutService.layoutState.update((val) => ({
                ...val,
                overlayMenuActive: false,
                mobileMenuActive: false,
                menuHoverActive: false,
            }));

            if (this.layoutService.hasOverlaySubmenu() && this.layoutService.isDesktop()) {
                this.layoutService.layoutState.update((val) => ({
                    ...val,
                    activePath: null,
                }));
            }
        }

        this.layoutService.onMenuStateChange({key: this.key});
    }

    onMouseEnter() {
        if (
            this.layoutService.isDesktop() &&
            this.root &&
            this.hasChildren &&
            this.layoutService.layoutState().menuHoverActive &&
            !this.active
        ) {
            this.active = true;
            this.layoutService.layoutState.update((val) => ({
                ...val,
                activePath: this.fullPath || null,
                menuHoverActive: true,
            }));
        }
    }

    onSubmenuAnimated() {
        if (this.root && this.active && this.layoutService.isDesktop() && (this.isHorizontal() || this.isSlim() || this.isSlimPlus())) {
            this.calculatePosition(this.submenu?.nativeElement, this.submenu?.nativeElement.parentElement);
        }
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
