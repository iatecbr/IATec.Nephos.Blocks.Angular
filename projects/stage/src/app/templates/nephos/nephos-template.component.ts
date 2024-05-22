import { Component } from '@angular/core';
import { NephosLayoutModule } from '@iatec/nephos-layout';

@Component({
    selector: 'nephos-template',
    standalone: true,
    imports: [
        NephosLayoutModule
    ],
    templateUrl: './nephos-template.component.html'
})
export class NephosTemplateComponent {
    constructor() {
    }
}
