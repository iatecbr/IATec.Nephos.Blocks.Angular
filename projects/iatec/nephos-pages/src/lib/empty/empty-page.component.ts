import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'nph-pages-empty',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './empty-page.component.html'
})
export class EmptyPageComponent {
    @Input() pageStyle: 'card' | 'none' = 'card';

    @ContentChild('title') title!: TemplateRef<unknown>;
    @ContentChild('content') content!: TemplateRef<unknown>;
}
