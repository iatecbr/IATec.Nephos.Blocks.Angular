import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuService} from '../../../services';
import {MenuItemComponent} from '../components/menu-item/menu-item.component';


@Component({
    selector: 'nph-layout-menu',
    imports: [
    MenuItemComponent
],
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
