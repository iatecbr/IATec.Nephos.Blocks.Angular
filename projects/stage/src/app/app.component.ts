import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NephosLayoutComponent } from '@iatec/nephos-layout';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NephosLayoutComponent,
        RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'stage';
}
