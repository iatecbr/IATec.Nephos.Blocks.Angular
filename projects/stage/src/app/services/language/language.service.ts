import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageModel } from '@iatec/nephos-layout';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(private _httpClient: HttpClient) {
    }

    public getLanguages(): Observable<LanguageModel[]> {
        return this._httpClient.get<LanguageModel[]>('assets/mock/languages.json');
    }
}
