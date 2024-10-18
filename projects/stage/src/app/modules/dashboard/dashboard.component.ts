import { Component } from '@angular/core';
import { MenuService } from '@iatec/nephos-layout';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    constructor(
        private _menuService: MenuService
    ) {
    }
}
