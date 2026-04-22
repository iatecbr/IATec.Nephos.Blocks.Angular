import { Component, computed, ContentChild, effect, inject, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutService } from '../../services';
import { ProfileSidebarComponent, SidebarComponent, TopbarComponent } from '../../components';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Toast } from 'primeng/toast';
import { LayoutConfigurator } from '../../components/configurator/layout.configurator';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
    selector: 'nph-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [
        NgClass,
        SidebarComponent,
        TopbarComponent,
        RouterOutlet,
        ProfileSidebarComponent,
        Toast,
        ConfirmDialog,
        LayoutConfigurator,
        NgTemplateOutlet,
    ],
})
export class LayoutComponent {
    layoutService = inject(LayoutService);
    router = inject(Router);

    @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

    @ViewChild(TopbarComponent) appTopBar!: TopbarComponent;

    @ContentChild('logo') logo!: TemplateRef<unknown>;
    @ContentChild('topbar') topbar!: TemplateRef<unknown>;
    @ContentChild('profileSidebar') profileSidebar!: TemplateRef<unknown>;

    constructor() {
        // Effect para bloquear scroll do body quando menu mobile estiver aberto
        effect(() => {
            const state = this.layoutService.layoutState();
            if (state.mobileMenuActive) {
                document.body.classList.add('blocked-scroll');
            } else {
                document.body.classList.remove('blocked-scroll');
            }
        });

        // Fechar menus ao mudar de rota
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.layoutService.layoutState.update((prev) => ({
                    ...prev,
                    overlayMenuActive: false,
                    mobileMenuActive: false,
                    menuHoverActive: false,
                }));
                this.layoutService.reset();
            });
    }

    containerClass = computed(() => {
        const layoutConfig = this.layoutService.layoutConfig();
        const layoutState = this.layoutService.layoutState();

        return {
            'layout-light': !layoutConfig.darkTheme,
            'layout-dark': layoutConfig.darkTheme,
            'layout-colorscheme-menu': layoutConfig.menuTheme === 'colorScheme',
            'layout-primarycolor-menu':
                layoutConfig.menuTheme === 'primaryColor',
            'layout-transparent-menu': layoutConfig.menuTheme === 'transparent',
            'layout-overlay': layoutConfig.menuMode === 'overlay',
            'layout-static': layoutConfig.menuMode === 'static',
            'layout-slim': layoutConfig.menuMode === 'slim',
            'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
            'layout-horizontal': layoutConfig.menuMode === 'horizontal',
            'layout-reveal': layoutConfig.menuMode === 'reveal',
            'layout-drawer': layoutConfig.menuMode === 'drawer',
            'layout-static-inactive':
                layoutState.staticMenuInactive &&
                layoutConfig.menuMode === 'static',
            'layout-overlay-active': layoutState.overlayMenuActive,
            'layout-mobile-active': layoutState.mobileMenuActive,
            'layout-sidebar-expanded': layoutState.sidebarExpanded,
            'layout-sidebar-anchored': layoutState.anchored,
        };
    });
}
