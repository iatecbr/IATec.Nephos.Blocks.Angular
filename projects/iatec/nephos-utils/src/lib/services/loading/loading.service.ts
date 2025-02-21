import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private _document = inject(DOCUMENT);
    private _isBusy: Array<number> = [];
    private _isBusyKeys: Array<string> = [];
    private _isLoading: Array<number> = [];
    private _isLoadingText: Array<string> = [];

    public urlFilter: Array<string> = [];

    get isBusy(): boolean {
        return !!this._isBusy.length;
    }

    set isBusy(status: boolean) {
        if (typeof status) {
            this._isBusy.push(1);
        } else {
            this._isBusy.shift();
        }
    }

    set isBusyFor(key: string) {
        if (!this._isBusyKeys.includes(key)) {
            this._isBusy.push(1);
            this._isBusyKeys.push(key);
        }
    }

    set doneFor(key: string) {
        const keyExists = this._isBusyKeys.includes(key);

        if (keyExists) {
            this._isBusy.shift();
            this._isBusyKeys = this._isBusyKeys.filter(x => x != key);
        }
    }

    private toggleLoading(): void {
        if (this._isLoading.length) {
            this._document.body.classList.remove('splash-screen-hidden');
        } else {
            this._document.body.classList.add('splash-screen-hidden');
        }
    }

    wasLoaded(source: string): void {
        if (this._isLoadingText.includes(source)) {
            this._isLoading.shift();
            this._isLoadingText = this._isLoadingText.filter(x => x != source);
        }

        this.toggleLoading();
    }

    set isLoading(status: boolean | Array<string> | string | null) {

        if (status === null) {
            return;
        } else if (typeof status === 'boolean' && status) {
            this._isLoading.push(1);
        } else if (typeof status === 'boolean') {
            this._isLoading = [];
        } else if (typeof status === 'object' && status.length > 1) {
            status.forEach(() => {
                this._isLoading.push(1);
            });
        } else if (typeof status === 'object') {
            this._isLoading = [];
        } else {
            if (!this._isLoadingText.includes(status)) {
                this._isLoading.push(1);
                this._isLoadingText.push(status);
            }

            let textLoader = this._document.getElementById('text-loader');

            // check if the element exists
            if (textLoader) {
                textLoader.innerHTML = status;
            }
        }

        this.toggleLoading();
    }
}
