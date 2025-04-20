import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'nph-layout-topbar-item',
    imports: [
        NgClass
    ],
    templateUrl: './topbar-item.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TopbarItemComponent {
    @Input() styleClass: string = '';
}
