import { Subject } from 'rxjs';
import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from 'primeng/api';
import { PageModel } from '../../models';
import { ErrorMessages, MessageKeys, MessageSeverities } from '../../constants';

export abstract class SummaryHelper<F, M> {

    protected messageService = inject(MessageService);
    protected translateService = inject(TranslocoService);

    protected destroy$ = new Subject<void>();
    protected filterSubject = new Subject<void>();

    protected page: PageModel<F, M>;

    protected constructor(filterFactory: () => F) {
        this.page = new PageModel<F, M>(filterFactory);
    }

    protected search(): void {
        this.filterSubject.next();
    }

    protected copyToClipboard(value: string): void {
        navigator.clipboard.writeText(value).then();
    }

    protected showSuccessMessage(summary: string, detail: string): void {
        this.messageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.success,
            summary: this.translateService.translate(summary),
            detail: this.translateService.translate(detail),
            life: 5000
        });
    }

    protected showErrorMessage(detail: string | undefined): void {
        this.messageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.error,
            summary: this.translateService.translate(ErrorMessages.ops),
            detail: detail,
            life: 5000
        })
    }

    protected stopWatch(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
