import { Component, effect } from '@angular/core';
import { LayoutService } from '../../services';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nph-profile-menu',
    templateUrl: './profile-sidebar.component.html'
})
export class ProfileSidebarComponent {

    name: string | undefined;

    constructor(public layoutService: LayoutService) {
        effect(() => {
            const profile = this.layoutService.profile();
            this.name = profile.name;
        });
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }
}
