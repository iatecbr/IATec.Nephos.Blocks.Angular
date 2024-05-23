import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../services';


@Component({
    selector: 'nph-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    constructor(public layoutService: LayoutService) {
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

}
