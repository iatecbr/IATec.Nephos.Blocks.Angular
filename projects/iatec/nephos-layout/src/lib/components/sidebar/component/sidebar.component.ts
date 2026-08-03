import { Component, ElementRef, ViewChild, OnInit, inject} from '@angular/core';
import {LayoutService, NEPHOS_USER_APPS} from '../../../services';
import {MenuComponent} from '../../menu';
import {RouterLink} from '@angular/router';
import { UserAppsComponent } from "../../topbar";
import { UserAppModel } from "../../../models";
import { SolutionLogoComponent } from "../components/solution-logo/solution-logo.component";
import { UserProfileComponent } from "../components/user-profile/user-profile.component";

@Component({
    selector: 'nph-layout-sidebar',
    imports: [
        MenuComponent,
        RouterLink,
        UserAppsComponent,
        SolutionLogoComponent,
        UserProfileComponent
    ],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    timeout: any = null;
    apps: UserAppModel[] = [];

    /**
     * De onde vem a lista de aplicações. OPCIONAL: quem consome a lib
     * decide se liga (`provideNephosUserApps`). Sem provider, a sidebar
     * só não mostra o menu de aplicações — nada quebra.
     *
     * Antes isto era o `HttpAppService` do app de demonstração, importado
     * por caminho relativo. Ver `services/user-apps.token.ts`.
     */
    private readonly _appsSource = inject(NEPHOS_USER_APPS, {optional: true});

    @ViewChild('menuContainer') menuContainer!: ElementRef;
    constructor(
        public layoutService: LayoutService){

    }

    ngOnInit(): void {
        this._getDependencies();
    }

    private _getDependencies() {
        this._appsSource?.getApps().subscribe((apps) => {
            this.apps = apps;
        });
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }


    onMouseEnter() {
        if (!this.layoutService.layoutState().anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            this.layoutService.layoutState.update((state) => {
                if (!state.sidebarActive) {
                    return {
                        ...state,
                        sidebarActive: true,
                    };
                }
                return state;
            });
        }
    }

    onMouseLeave() {
        if (!this.layoutService.layoutState().anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => {
                    this.layoutService.layoutState.update((state) => {
                        if (state.sidebarActive) {
                            return {
                                ...state,
                                sidebarActive: false,
                            };
                        }
                        return state;
                    });
                }, 300);
            }
        }
    }

    anchor() {
        this.layoutService.layoutState.update((state) => ({
            ...state,
            anchored: !state.anchored,
        }));
    }
}
