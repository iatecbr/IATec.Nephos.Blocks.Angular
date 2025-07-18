import {Component, computed} from '@angular/core';
import {LayoutService} from '../../../services';
import {Drawer} from 'primeng/drawer';

@Component({
    selector: 'nph-layout-profile-sidebar',
    imports: [
        Drawer
    ],
    templateUrl: './profile-sidebar.component.html'
})
export class ProfileSidebarComponent {

    visible = computed(
        () => this.layoutService.layoutState().profileSidebarVisible,
    );

    constructor(public layoutService: LayoutService) {
    }

    onDrawerHide() {
        this.layoutService.layoutState.update((state) => ({
            ...state,
            profileSidebarVisible: false,
        }));
    }
}
