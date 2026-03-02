import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {LayoutService} from '../../../services';
import {MenuComponent} from '../../menu';
import {RouterLink} from '@angular/router';
import { UserAppsComponent } from "../../topbar";
import { HttpAppService } from "../../../../../../../stage/src/app/services";
import { UserAppModel } from "../../../models";
import { forkJoin } from "rxjs";
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

    @ViewChild('menuContainer') menuContainer!: ElementRef;
    constructor(
        public layoutService: LayoutService, private _appsService: HttpAppService){

    }

    ngOnInit(): void {
        this._getDependencies();
    }

    private _getDependencies() {
        forkJoin([
            this._appsService.getApps()
        ]).subscribe(([ apps
                      ]) => {
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
