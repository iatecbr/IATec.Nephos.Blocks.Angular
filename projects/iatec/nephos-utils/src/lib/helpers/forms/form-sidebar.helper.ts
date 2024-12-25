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
import { Observable } from 'rxjs';
import { LoadingService } from '../../services';

// noinspection JSUnusedGlobalSymbols
export abstract class FormSidebarHelper extends FormGroupChanges {

    protected loadingService = inject(LoadingService);
    protected messageService = inject(MessageService);
    protected translateService = inject(TranslocoService);
    private confirmationService = inject(ConfirmationService);

    // noinspection JSUnusedLocalSymbols
    protected handleSubscription(observable: Observable<void>, successMessage: string): void {
        observable.subscribe(
            {
                next: () => {
                    this.showSuccessMessage(successMessage);

                    this.beforeClose().then(() => {
                        this.closeWithChanges();
                    });
                },
                error: (error) => {
                    this.showErrorMessage(error.code ? error.messages[0] : error.message);

                    this.loadingService.isBusy = false;
                }
            }
        );
    }

    // noinspection JSUnusedGlobalSymbols
    protected abstract beforeClose(): Promise<void>;

    // noinspection JSUnusedGlobalSymbols
    protected abstract closeWithoutChanges(): void;

    // noinspection JSUnusedGlobalSymbols
    protected abstract closeWithChanges(): void;

    // noinspection JSUnusedGlobalSymbols
    protected showSuccessMessage(detail: string): void {
        this.messageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.success,
            summary: this.translateService.translate(SuccessMessages.everythingOk),
            detail: this.translateService.translate(detail),
        });
    }

    // noinspection JSUnusedGlobalSymbols
    protected showErrorMessage(detail: string | undefined): void {
        this.messageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.error,
            summary: this.translateService.translate(ErrorMessages.ops),
            detail: detail,
            life: 5000
        })
    }

    protected close(event: Event): void {
        if (!this.form.dirty) {
            this.beforeClose().then(() => {
                this.closeWithoutChanges();
            });
        } else {
            this.confirmationService.confirm({
                key: MessageKeys.default,
                target: event.target || new EventTarget,
                message: this.translateService.translate(WaringMessages.wantToProceed),
                acceptLabel: this.translateService.translate(GeneralTranslationKeys.response.yes),
                rejectLabel: this.translateService.translate(GeneralTranslationKeys.response.no),
                icon: 'fa-duotone fa-solid fa-triangle-exclamation',
                accept: () => {
                    this.beforeClose().then(() => {
                        this.closeWithoutChanges();
                    });
                },
                reject: () => {
                    return;
                }
            });
        }
    }
}
