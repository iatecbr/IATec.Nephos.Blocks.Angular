import {Component, inject} from '@angular/core';
import {
    LayoutService,
    ProfileSidebarBlockComponent,
    ProfileSidebarBlockItemComponent,
    ProfileSidebarBlockSubtitleComponent,
    ProfileSidebarBlockTitleComponent
} from '@iatec/nephos-layout';

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
    public layoutService = inject(LayoutService);

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
