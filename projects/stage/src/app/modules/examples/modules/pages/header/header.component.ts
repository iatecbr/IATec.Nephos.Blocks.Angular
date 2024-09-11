import { Component } from '@angular/core';
import { HeaderPageComponent } from '@iatec/nephos-pages';

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        HeaderPageComponent
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
