import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';

type DebugType = 'isBusy' | 'isBusyKeys' | 'isLoading' | 'isLoadingText' | 'urlFilter';

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

    private _busyKeysSignal = signal<Set<string>>(new Set());

    get isBusy(): boolean {
        return !!this._isBusy.length;
    }

    set isBusy(status: boolean) {
        if (status) {
            this._isBusy.push(1);
        } else {
            this._isBusy.shift();
        }
    }

    set startingFor(key: string) {
        if (!this._isBusyKeys.includes(key)) {
            this._isBusy.push(1);
            this._isBusyKeys.push(key);

            this._busyKeysSignal.set(new Set(this._isBusyKeys));
        }
    }

    set doneFor(key: string) {
        const keyExists = this._isBusyKeys.includes(key);

        if (keyExists) {
            this._isBusy.shift();
            this._isBusyKeys = this._isBusyKeys.filter(x => x != key);

            this._busyKeysSignal.set(new Set(this._isBusyKeys));
        }
    }

    isBusyFor(key: string): Signal<boolean> {
        return computed(() => this._busyKeysSignal().has(key));
    }

    isBusyForValue(key: string): boolean {
        return this._busyKeysSignal().has(key);
    }

    checkFor(key: string): boolean {
        return this._isBusyKeys.includes(key);
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
            this._isLoadingText = [];
        } else if (typeof status === 'object' && status.length > 1) {
            status.forEach(() => {
                this._isLoading.push(1);
            });
        } else if (typeof status === 'object') {
            this._isLoading = [];
            this._isLoadingText = [];
        } else {
            if (!this._isLoadingText.includes(status)) {
                this._isLoading.push(1);
                this._isLoadingText.push(status);
            }

            let textLoader = this._document.getElementById('text-loader');

            if (textLoader) {
                textLoader.innerHTML = status;
            }
        }

        this.toggleLoading();
    }

    debug(type?: DebugType | DebugType[] | null): void {
        const logAll = () => {
            console.log('isBusy:', this._isBusy);
            console.log('isBusyKeys:', this._isBusyKeys);
            console.log('isLoading:', this._isLoading);
            console.log('isLoadingText:', this._isLoadingText);
            console.log('urlFilter:', this.urlFilter);
        };

        if (!type || (Array.isArray(type) && type.length === 0)) {
            logAll();
        } else if (typeof type === 'string') {
            this.debug([type]);
        } else if (Array.isArray(type)) {
            type.forEach(t => {
                switch (t) {
                    case 'isBusy':
                        console.log('isBusy:', this.isBusy);
                        break;
                    case 'isBusyKeys':
                        console.log('isBusyKeys:', this._isBusyKeys);
                        break;
                    case 'isLoading':
                        console.log('isLoading:', this._isLoading);
                        break;
                    case 'isLoadingText':
                        console.log('isLoadingText:', this._isLoadingText);
                        break;
                    case 'urlFilter':
                        console.log('urlFilter:', this.urlFilter);
                        break;
                    default:
                        console.warn('Unknown type:', t);
                }
            });
        }
    }
}
