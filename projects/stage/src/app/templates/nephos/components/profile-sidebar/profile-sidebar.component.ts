import { Component, effect } from '@angular/core';
import { LayoutService, NephosLayoutModule } from '@iatec/nephos-layout';

@Component({
    selector: 'app-nephos-template-profile-sidebar',
    standalone: true,
    imports: [
        NephosLayoutModule
    ],
    templateUrl: './profile-sidebar.component.html'
})
export class ProfileSidebarComponent {
    name: string | undefined;

    constructor(
        private _layoutService: LayoutService
    ) {
        effect(() => {
            const profile = this._layoutService.profile();
            this.name = profile.name;
        });
    }

    onCommentClick() {
        console.log('Comment clicked');
    }

    onProfileClick() {
        console.log('Profile clicked');
    }

    onSignOutClick() {
        console.log('SignOut clicked');
    }
}
