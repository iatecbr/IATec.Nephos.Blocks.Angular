import {Component} from '@angular/core';
import {EmptyPageComponent} from '@iatec/nephos-pages';

@Component({
    selector: 'app-default',
    templateUrl: './empty.component.html',
    standalone: true,
    imports: [EmptyPageComponent]
})
export class EmptyComponent {
}
