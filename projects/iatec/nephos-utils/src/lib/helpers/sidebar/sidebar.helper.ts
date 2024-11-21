import { FormGroupChanges } from '../forms';
import { ErrorMessages, GeneralTranslationKeys, MessageKeys, MessageSeverities, WaringMessages } from '../../constants';
import { inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';

// noinspection JSUnusedGlobalSymbols
export abstract class SidebarHelper extends FormGroupChanges {

    protected _massageService = inject(MessageService);
    protected _translateService = inject(TranslocoService);
    private _confirmationService = inject(ConfirmationService);

    // noinspection JSUnusedGlobalSymbols
    protected abstract _beforeLeave(): Promise<void>;

    // noinspection JSUnusedGlobalSymbols
    protected abstract _startLeave(): void;

    // noinspection JSUnusedGlobalSymbols
    protected _showSuccessMessage(summary: string, detail: string): void {
        this._massageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.success,
            summary: this._translateService.translate(summary),
            detail: this._translateService.translate(detail),
        });
    }

    // noinspection JSUnusedGlobalSymbols
    protected _showErrorMessage(detail: string | undefined): void {
        this._massageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.error,
            summary: this._translateService.translate(ErrorMessages.ops),
            detail: detail,
            life: 5000
        })
    }

    protected _close(event: Event): void {
        if (!this._form.dirty) {
            this._beforeLeave().then(() => {
                this._startLeave();
            });
        } else {
            this._confirmationService.confirm({
                key: MessageKeys.default,
                target: event.target || new EventTarget,
                message: this._translateService.translate(WaringMessages.wantToProceed),
                acceptLabel: this._translateService.translate(GeneralTranslationKeys.singular.yes),
                rejectLabel: this._translateService.translate(GeneralTranslationKeys.singular.no),
                icon: 'fa-duotone fa-solid fa-triangle-exclamation',
                accept: () => {
                    this._beforeLeave().then(() => {
                        this._startLeave();
                    });
                },
                reject: () => {
                    return;
                }
            });
        }
    }
}
