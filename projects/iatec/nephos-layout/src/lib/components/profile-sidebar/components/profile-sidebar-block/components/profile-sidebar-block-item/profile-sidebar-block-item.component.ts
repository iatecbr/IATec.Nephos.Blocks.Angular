import { Component, Input } from '@angular/core';

@Component({
    selector: 'nph-layout-profile-sidebar-block-item',
    templateUrl: './profile-sidebar-block-item.component.html',
})
export class ProfileSidebarBlockItemComponent {
    @Input() icon: string | undefined;
    @Input() badge: string | undefined;
}
