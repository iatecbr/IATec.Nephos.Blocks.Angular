import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
    selector: 'nph-layout-topbar-item',
    imports: [
        NgClass
    ],
    templateUrl: './topbar-item.component.html'
})
export class TopbarItemComponent {
    @Input() styleClass: string = '';
}
