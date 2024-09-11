import { Component, Input } from '@angular/core';

@Component({
    selector: 'nph-pages-empty',
    standalone: true,
    imports: [],
    templateUrl: './empty-page.component.html'
})
export class EmptyPageComponent {
    @Input() pageStyle: 'card' | 'none' = 'card';
}
