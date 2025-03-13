import { Component } from '@angular/core';
import { LayoutService } from '../../../services';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nph-layout-profile-sidebar',
    templateUrl: './profile-sidebar.component.html',
    standalone: false
})
export class ProfileSidebarComponent {

    constructor(public layoutService: LayoutService) {
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }
}
