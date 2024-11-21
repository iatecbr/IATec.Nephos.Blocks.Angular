import { FormGroupChanges } from './index';
import {
    ErrorMessages,
    GeneralTranslationKeys,
    MessageKeys,
    MessageSeverities,
    SuccessMessages,
    WaringMessages
} from '../../constants';
import { inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';

// noinspection JSUnusedGlobalSymbols
export abstract class FormSidebarHelper extends FormGroupChanges {

    protected _massageService = inject(MessageService);
    protected _translateService = inject(TranslocoService);
    private _confirmationService = inject(ConfirmationService);

    // noinspection JSUnusedGlobalSymbols
    protected abstract _beforeClose(): Promise<void>;

    // noinspection JSUnusedGlobalSymbols
    protected abstract _closeWithoutChanges(): void;

    // noinspection JSUnusedGlobalSymbols
    protected abstract _closeWithChanges(): void;

    // noinspection JSUnusedGlobalSymbols
    protected _showSuccessMessage(detail: string): void {
        this._massageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.success,
            summary: this._translateService.translate(SuccessMessages.everythingOk),
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
            this._beforeClose().then(() => {
                this._closeWithoutChanges();
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
                    this._beforeClose().then(() => {
                        this._closeWithoutChanges();
                    });
                },
                reject: () => {
                    return;
                }
            });
        }
    }
}
