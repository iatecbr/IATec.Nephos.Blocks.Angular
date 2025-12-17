import {Component, Input} from '@angular/core';
import {Badge} from 'primeng/badge';
import { NgClass } from '@angular/common';

@Component({
    selector: 'nph-layout-profile-sidebar-block-item',
    imports: [
    Badge,
    NgClass
],
    templateUrl: './profile-sidebar-block-item.component.html'
})
export class ProfileSidebarBlockItemComponent {
    @Input() icon: string | undefined;
    @Input() badge: string | undefined;
}
