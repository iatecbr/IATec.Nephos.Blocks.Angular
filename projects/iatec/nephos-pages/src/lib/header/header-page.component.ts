import { Component, Input } from '@angular/core';

@Component({
    selector: 'nph-pages-header',
    imports: [],
    templateUrl: './header-page.component.html'
})
export class HeaderPageComponent {
    @Input() headerStyle: 'card' | 'none' = 'card';
    @Input() bodyStyle: 'card' | 'none' = 'card';
}
