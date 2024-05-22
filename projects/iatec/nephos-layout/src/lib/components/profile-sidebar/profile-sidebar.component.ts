import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-profilemenu',
    templateUrl: './profile-sidebar.component.html'
})
export class ProfileSidebarComponent {

    constructor(public layoutService: LayoutService) { }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }
}
