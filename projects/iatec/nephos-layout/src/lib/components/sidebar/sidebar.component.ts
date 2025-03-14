import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../services';
import { MenuComponent } from '../menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'nph-layout-sidebar',
    imports: [
        MenuComponent,
        RouterLink
    ],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    timeout: any = null;

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public el: ElementRef) {
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
