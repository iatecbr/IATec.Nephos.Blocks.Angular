import {
    AfterViewChecked,
    Component,
    computed,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {LayoutService} from '../../../../services';
import {DomHandler} from 'primeng/dom';
import {TranslocoPipe} from '@jsverse/transloco';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {Ripple} from 'primeng/ripple';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[nph-layout-menu-item]',
    templateUrl: `menu-item.component.html`,
    imports: [
        TranslocoPipe,
        NgClass,
        Tooltip,
        RouterLinkActive,
        RouterLink,
        NgForOf,
        Ripple,
        NgIf
    ],
    animations: [
        trigger('children', [
            state(
                'collapsed',
                style({
                    height: '0'
                })
            ),
            state(
                'expanded',
                style({
                    height: '*'
                })
            ),
            state(
                'hidden',
                style({
                    display: 'none'
                })
            ),
            state(
                'visible',
                style({
                    display: 'block'
                })
            ),
            transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class MenuItemComponent implements OnInit, AfterViewChecked, OnDestroy {
    @Input() item: any;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    @ViewChild('submenu') submenu!: ElementRef;
    active = false;
    menuSourceSubscription: Subscription;
    menuResetSubscription: Subscription;
    key: string = '';
    isSlim = computed(() => this.layoutService.isSlim());
    isSlimPlus = computed(() => this.layoutService.isSlimPlus());
    isHorizontal = computed(() => this.layoutService.isHorizontal());

    constructor(
        public layoutService: LayoutService,
        public router: Router
    ) {
        this.menuSourceSubscription = this.layoutService.menuSource$.subscribe((value) => {
            Promise.resolve(null).then(() => {
                if (value.routeEvent) {
                    this.active = value.key === this.key || value.key.startsWith(this.key + '-');
                } else {
                    if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                        this.active = false;
                    }
                }
            });
        });

        this.menuResetSubscription = this.layoutService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            if (this.isSlimPlus() || this.isSlim() || this.isHorizontal()) {
                this.active = false;
            } else {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            }
        });
    }

    @HostBinding('class.active-menuitem')
    get activeClass() {
        return this.active;
    }

    get submenuAnimation() {
        if (this.layoutService.isDesktop() && (this.layoutService.isHorizontal() || this.layoutService.isSlim() || this.layoutService.isSlimPlus())) {
            return this.active ? 'visible' : 'hidden';
        } else return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
    }

    get isDesktop() {
        return this.layoutService.isDesktop();
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (!(this.isSlimPlus() || this.isSlim() || this.isHorizontal()) && this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }

    ngAfterViewChecked() {
        if (this.root && this.active && this.isDesktop && (this.isHorizontal() || this.isSlim() || this.isSlimPlus())) {
            this.calculatePosition(this.submenu?.nativeElement, this.submenu?.nativeElement.parentElement);
        }
    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.routerLink[0], {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
        });

        if (activeRoute) {
            this.layoutService.onMenuStateChange({
                key: this.key,
                routeEvent: true
            });
        }
    }

    onSubmenuAnimated(event: AnimationEvent) {
        if (event.toState === 'visible' && this.isDesktop && (this.isHorizontal() || this.isSlim() || this.isSlimPlus())) {
            const el = <HTMLUListElement>event.element;
            const elParent = <HTMLUListElement>el.parentElement;
            this.calculatePosition(el, elParent);
        }
    }

    calculatePosition(overlay: HTMLElement, target: HTMLElement) {
        if (overlay) {
            const {left, top} = target.getBoundingClientRect();
            const [vWidth, vHeight] = [window.innerWidth, window.innerHeight];
            const [oWidth, oHeight] = [overlay.offsetWidth, overlay.offsetHeight];
            const scrollbarWidth = DomHandler.calculateScrollbarWidth();
            // reset
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
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // navigate with hover
        if ((this.root && this.isSlim()) || this.isHorizontal() || this.isSlimPlus()) {
            this.layoutService.layoutState.update((val) => ({
                ...val,
                menuHoverActive: !val.menuHoverActive
            }));
        }

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;

            if (this.root && this.active && (this.isSlim() || this.isHorizontal() || this.isSlimPlus())) {
                this.layoutService.onOverlaySubmenuOpen();
            }
        } else {
            if (this.layoutService.isMobile()) {
                this.layoutService.layoutState.update((val) => ({
                    ...val,
                    staticMenuMobileActive: false
                }));
            }

            if (this.isSlim() || this.isHorizontal() || this.isSlimPlus()) {
                this.layoutService.reset();
                this.layoutService.layoutState.update((val) => ({
                    ...val,
                    menuHoverActive: false
                }));
            }
        }

        this.layoutService.onMenuStateChange({key: this.key});
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root && (this.isSlim() || this.isHorizontal() || this.isSlimPlus()) && this.layoutService.isDesktop()) {
            if (this.layoutService.layoutState().menuHoverActive) {
                this.active = true;
                this.layoutService.onMenuStateChange({key: this.key});
            }
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
