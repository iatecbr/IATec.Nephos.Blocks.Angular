import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../service';

@Component({
    selector: 'nph-menu',
    templateUrl: './menu.component.html'
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
