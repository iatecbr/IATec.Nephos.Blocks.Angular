import { Component, computed } from '@angular/core';
import { LayoutService } from '../../../services';
import { Drawer } from 'primeng/drawer';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nph-layout-profile-sidebar',
    imports: [
        Drawer
    ],
    templateUrl: './profile-sidebar.component.html'
})
export class ProfileSidebarComponent {

    constructor(public layoutService: LayoutService) {
    }

    visible = computed(
        () => this.layoutService.layoutState().profileSidebarVisible,
    );

    onDrawerHide() {
        this.layoutService.layoutState.update((state) => ({
            ...state,
            profileSidebarVisible: false,
        }));
    }
}
