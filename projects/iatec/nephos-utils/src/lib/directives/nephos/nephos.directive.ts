import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
    selector: '[nphTemplate]',
    standalone: true
})
export class NephosDirective {
    @Input('nphTemplate') name: string = '';

    constructor(public template: TemplateRef<any>) {
    }
}
