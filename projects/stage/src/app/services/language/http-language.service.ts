import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LanguageModel} from '@iatec/nephos-layout';

@Injectable({
    providedIn: 'root'
})
export class HttpLanguageService {

    constructor(private _http: HttpClient) {
    }

    public getLanguages(): Observable<LanguageModel[]> {
        return this._http.get<LanguageModel[]>('assets/mock/languages.json');
    }
}
