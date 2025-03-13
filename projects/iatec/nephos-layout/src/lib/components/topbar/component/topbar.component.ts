import { Component, effect, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColorScheme, LayoutService, MenuService } from '../../../services';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'nph-layout-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TopbarComponent {

    colorScheme = 'light' as ColorScheme;

    @ViewChild('menubutton') menuButton!: ElementRef;

    urlAvatar: string | undefined;
    letters: string | undefined;

    constructor(
        public layoutService: LayoutService
    ) {
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

    onThemeChange() {
        this.colorScheme = this.colorScheme == 'light' ? 'dark' : 'light'

        this.layoutService.config.update(
            (config) => ({
                ...config,
                colorScheme: this.colorScheme,
            }));
    }
}
