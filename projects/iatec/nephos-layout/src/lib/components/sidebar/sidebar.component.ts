import { Component, effect, ElementRef, ViewChild, OnInit } from '@angular/core';
import {LayoutService} from '../../services';
import {MenuComponent} from '../menu';
import {RouterLink} from '@angular/router';
import { UserAppsComponent } from "../topbar";
import { HttpAppService } from "../../../../../../stage/src/app/services";
import { UserAppModel } from "../../models";
import { forkJoin } from "rxjs";

@Component({
    selector: 'nph-layout-sidebar',
    imports: [
        MenuComponent,
        RouterLink,
        UserAppsComponent
    ],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit{
    timeout: any = null;

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    urlAvatar: string | undefined;
    letters: string | undefined;
    apps: UserAppModel[] = [];

    constructor(
        public layoutService: LayoutService,
        private _appsService: HttpAppService,
        public el: ElementRef) {
        effect(() => {
            const profile = this.layoutService.profile();
            this.urlAvatar = profile.urlAvatar;

            if (profile.name) {
                const names = profile.name.split(' ');
                const firstName = names[0].charAt(0);
                const lastName = names[names.length - 1].charAt(0);
                this.letters = `${firstName} ${lastName}`;
            }
        });
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


    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
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
