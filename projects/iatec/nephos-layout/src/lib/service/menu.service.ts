import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEventModel } from '../models';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menuSource = new Subject<MenuChangeEventModel>();
    private resetSource = new Subject();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(event: MenuChangeEventModel) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }
}
