import { Component, Input } from '@angular/core';

@Component({
    selector: 'nph-layout-topbar-item',
    templateUrl: './topbar-item.component.html'
})
export class TopbarItemComponent {
    @Input() styleClass: string = '';
}
