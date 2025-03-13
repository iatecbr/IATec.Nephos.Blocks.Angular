import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../services';

@Component({
    selector: 'nph-layout-menu',
    templateUrl: './menu.component.html',
    standalone: false
})
export class MenuComponent {

    model: MenuItem[] = [];

    constructor(
        private _menuService: MenuService
    ) {
        this._menuService.menus$.subscribe({
            next: (menus) => {
                this.model = menus;
            }
        });
    }
}
