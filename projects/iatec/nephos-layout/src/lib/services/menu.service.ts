import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEventModel } from '../models';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private _menuSource = new Subject<MenuChangeEventModel>();
    private _resetSource = new Subject();
    private _menus: Subject<MenuItem[]> = new Subject<MenuItem[]>();

    menuSource$ = this._menuSource.asObservable();
    resetSource$ = this._resetSource.asObservable();
    menus$ = this._menus.asObservable();

    onMenuStateChange(event: MenuChangeEventModel) {
        this._menuSource.next(event);
    }

    reset() {
        this._resetSource.next(true);
    }

    set menus(menus: MenuItem[]) {
        this._menus.next(menus);
    }
}
