import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class HttpMenuService {

    constructor(
        private _http: HttpClient
    ) {
    }

    getMenus(): Observable<MenuItem[]> {
        return this._http.get<MenuItem[]>('assets/mock/menus.json');
    }
}
