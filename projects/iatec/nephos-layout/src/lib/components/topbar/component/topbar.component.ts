import {Component, effect, ElementRef, Input, ViewChild} from '@angular/core';
import {ColorScheme, LayoutService} from '../../../services';
import {BreadcrumbComponent} from '../../breadcrumb';
import {ButtonDirective} from 'primeng/button';



@Component({
    selector: 'nph-layout-topbar',
    templateUrl: './topbar.component.html',
    imports: [
    BreadcrumbComponent,
    ButtonDirective
],
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

    @Input() showMenuButton = true;
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
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
}
