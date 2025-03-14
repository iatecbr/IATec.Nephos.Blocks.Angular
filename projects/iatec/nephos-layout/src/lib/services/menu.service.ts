import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private _menus: Subject<MenuItem[]> = new Subject<MenuItem[]>();

    menus$ = this._menus.asObservable();

    set menus(menus: MenuItem[]) {
        this._menus.next(menus);
    }
}
