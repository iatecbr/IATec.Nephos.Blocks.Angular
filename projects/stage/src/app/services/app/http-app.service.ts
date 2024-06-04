import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAppModel } from '@iatec/nephos-layout';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpAppService {

    constructor(private _http: HttpClient) {
    }

    getApps(): Observable<UserAppModel[]> {
        return this._http.get<UserAppModel[]>('assets/mock/apps.json');
    }
}
