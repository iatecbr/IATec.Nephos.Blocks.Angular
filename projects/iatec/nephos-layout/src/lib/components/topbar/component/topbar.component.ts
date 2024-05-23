import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../../services';


@Component({
    selector: 'nph-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    urlAvatar: string | undefined;
    letters: string | undefined;

    constructor(public layoutService: LayoutService) {
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

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }
}
