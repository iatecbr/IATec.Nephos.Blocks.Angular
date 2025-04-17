import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'nph-pages-header',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './header-page.component.html'
})
export class HeaderPageComponent {
    @Input() headerStyle: 'card' | 'none' = 'card';
    @Input() bodyStyle: 'card' | 'none' = 'card';

    @ContentChild('title') title!: TemplateRef<unknown>;
    @ContentChild('header') header!: TemplateRef<unknown>;
    @ContentChild('body') body!: TemplateRef<unknown>;
}
