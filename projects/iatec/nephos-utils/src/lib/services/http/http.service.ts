import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private _http = inject(HttpClient);

    public get<T>(url: string, filters: object | undefined = undefined): Observable<T> {
        let params = new HttpParams();

        if (filters) {
            Object.keys(filters).forEach(key => {
                const value = filters[key as keyof typeof filters];

                if (value !== undefined && value !== null) {
                    params = params.set(key, `${value}`);
                }
            });
        }

        return this._http.get<T>(url, {params});
    }

    public post<T>(url: string, body: object): Observable<T> {
        return this._http.post<T>(url, body);
    }

    public put<T>(url: string, body: object | undefined = undefined): Observable<T> {
        return this._http.put<T>(url, body);
    }

    public delete<T>(url: string): Observable<T> {
        return this._http.delete<T>(url);
    }
}
