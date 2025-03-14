import { Component, effect } from '@angular/core';
import { LayoutService, ProfileSidebarBlockTitleComponent} from '@iatec/nephos-layout';
import {
    ProfileSidebarBlockComponent,
    ProfileSidebarBlockItemComponent,
    ProfileSidebarBlockSubtitleComponent
} from '../../../../../../../iatec/nephos-layout/src/lib/components/profile-sidebar';

@Component({
    selector: 'app-nephos-template-profile-sidebar',
    imports: [
        ProfileSidebarBlockTitleComponent,
        ProfileSidebarBlockSubtitleComponent,
        ProfileSidebarBlockItemComponent,
        ProfileSidebarBlockComponent
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
