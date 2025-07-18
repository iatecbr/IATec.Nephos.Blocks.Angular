import {FormBuilder, FormGroup} from '@angular/forms';
import {inject} from '@angular/core';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {IDBPDatabase, openDB} from 'idb';
import {FormSettingsModel} from './form-settings.model';
import {FormModeType} from './form-mode.type';


export abstract class FormGroupChanges {

    protected formSubject$: Subject<void> = new Subject<void>();
    protected router = inject(Router);

    // noinspection JSUnusedGlobalSymbols
    protected formBuilder = inject(FormBuilder);
    protected form: FormGroup = new FormGroup({});
    protected formMode: FormModeType = 'create';
    protected enableFormReset: boolean = false;

    private _db: IDBPDatabase | undefined;
    private _formKey: string | undefined;
    private _formVersion: string | undefined;
    private _dbVersion: number = 1;

    private get _getCurrentRouteWithoutQueryString(): string {
        return this.router.url.split('?')[0];
    }

    // noinspection JSUnusedGlobalSymbols
    protected async initFormStorage(settings: FormSettingsModel): Promise<void> {

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
                await this.clearFormCache();
            }

            await this._loadFormCache();
            await this._initWatchForm();
        }
    }

    protected async clearFormCache(): Promise<void> {
        if (this._db && this._formKey) {
            const txCacheDelete = this._db.transaction('formsCache', 'readwrite');
            await txCacheDelete.objectStore('formsCache').delete(this._formKey);
            await txCacheDelete.done;

            const txHistoryDelete = this._db.transaction('formsHistory', 'readwrite');
            await txHistoryDelete.objectStore('formsHistory').delete(this._formKey);
            await txHistoryDelete.done

            this.enableFormReset = false;
        }
    }

    // noinspection JSUnusedGlobalSymbols
    protected stopWatchForm(): void {
        this._workChanges().then(() => {
            this.formSubject$.next();
            this.formSubject$.complete();
        });
    }

    private async _initDB(): Promise<void> {
        this._db = await openDB('IATecServicesDB', this._dbVersion, {
            upgrade(db) {
                db.createObjectStore('formsCache', {keyPath: 'key'});
                db.createObjectStore('formsHistory', {keyPath: 'key'});
            }
        });
    }

    private async _workChanges(): Promise<void> {
        if (this.formMode == 'create' && this._db) {
            const key = this._formKey;
            const data = this.form.getRawValue();

            if (this.enableFormReset) {
                await this.clearFormCache();
                return;
            }

            const writeCache = this._db.transaction('formsCache', 'readwrite');
            await writeCache.objectStore('formsCache').put({key, data});
            await writeCache.done;

            let history = {'version': this._formVersion, 'date': new Date().getTime()}

            const writeHistory = this._db.transaction('formsHistory', 'readwrite');
            await writeHistory.objectStore('formsHistory').put({key, history});
        }
    }

    private async _initWatchForm(): Promise<void> {
        this.form.valueChanges
            .pipe(
                debounceTime(600),
                takeUntil(this.formSubject$)
            ).subscribe(async () => {
                await this._workChanges();
            }
        );
    }

    private async _loadFormCache(): Promise<void> {
        if (this._db && this._formKey) {
            const txCache = this._db.transaction('formsCache', 'readonly');
            const existingCache = await txCache.objectStore('formsCache').get(this._formKey);
            await txCache.done;

            if (existingCache) {
                this.form.patchValue(existingCache.data);
                this.form.markAsDirty();
            }
        }
    }
}
