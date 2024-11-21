import { FormBuilder, FormGroup } from '@angular/forms';
import { inject } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { IDBPDatabase, openDB } from 'idb';
import { FormSettingsModel } from './form-settings.model';
import { FormModeType } from './form-mode.type';


export abstract class FormGroupChanges {
    protected _formSubject$: Subject<void> = new Subject<void>();
    protected _router = inject(Router);

    protected _formBuilder = inject(FormBuilder);
    protected _form: FormGroup = new FormGroup({});
    protected _formMode: FormModeType = 'create';
    protected _enableFormReset: boolean = false;

    private _db: IDBPDatabase | undefined;
    private _formKey: string | undefined;
    private _formVersion: string | undefined;
    private _dbVersion: number = 1;

    private async _initDB(): Promise<void> {
        this._db = await openDB('IATecServicesDB', this._dbVersion, {
            upgrade(db) {
                db.createObjectStore('formsCache', {keyPath: 'key'});
                db.createObjectStore('formsHistory', {keyPath: 'key'});
            }
        });
    }

    private get _getCurrentRouteWithoutQueryString(): string {
        return this._router.url.split('?')[0];
    }

    protected async _initFormStorage(settings: FormSettingsModel): Promise<void> {

        this._formKey = `${this._getCurrentRouteWithoutQueryString}:${this.constructor.name}`;
        this._formVersion = settings.version

        await this._initDB();

        if (this._db) {
            const txHistory = this._db.transaction('formsHistory', 'readonly');
            const existingHistory = await txHistory.objectStore('formsHistory').get(this._formKey);
            await txHistory.done;

            let shouldDeleteCache = false;

            if (existingHistory) {
                const existingVersion = existingHistory.history.version;
                const existingDate = existingHistory.history.date;
                const currentDate = new Date();
                const daysDifference = Math.floor((currentDate.getTime() - existingDate) / (1000 * 3600 * 24));

                if (existingVersion !== this._formVersion || daysDifference >= 5) {
                    shouldDeleteCache = true;
                }
            }

            if (shouldDeleteCache) {
                await this._clearFormCache();
            }

            await this._loadFormCache();
            await this._initWatchForm();
        }
    }

    private async _initWatchForm(): Promise<void> {
        this._form.valueChanges
            .pipe(
                debounceTime(1000),
                takeUntil(this._formSubject$)
            ).subscribe(async () => {
                if (this._formMode == 'create' && this._db) {
                    const key = this._formKey;
                    const data = this._form.getRawValue();

                    if (!this._enableFormReset) {
                        const writeCache = this._db.transaction('formsCache', 'readwrite');
                        await writeCache.objectStore('formsCache').put({key, data});
                        await writeCache.done;

                        let history = {'version': this._formVersion, 'date': new Date().getTime()}

                        const writeHistory = this._db.transaction('formsHistory', 'readwrite');
                        await writeHistory.objectStore('formsHistory').put({key, history});
                    } else {
                        await this._clearFormCache();
                    }
                }
            }
        );
    }

    private async _loadFormCache(): Promise<void> {
        if (this._db && this._formKey) {
            const txCache = this._db.transaction('formsCache', 'readonly');
            const existingCache = await txCache.objectStore('formsCache').get(this._formKey);
            await txCache.done;

            if (existingCache) {
                this._form.patchValue(existingCache.data);
                this._form.markAsDirty();
            }
        }
    }

    protected async _clearFormCache(): Promise<void> {
        if (this._db && this._formKey) {
            const txCacheDelete = this._db.transaction('formsCache', 'readwrite');
            await txCacheDelete.objectStore('formsCache').delete(this._formKey);
            await txCacheDelete.done;

            const txHistoryDelete = this._db.transaction('formsHistory', 'readwrite');
            await txHistoryDelete.objectStore('formsHistory').delete(this._formKey);
            await txHistoryDelete.done

            this._enableFormReset = false;
        }
    }

    protected _stopWatchForm(): void {
        this._formSubject$.next();
        this._formSubject$.complete();
    }
}
