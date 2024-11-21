import { Subject } from 'rxjs';
import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from 'primeng/api';
import { PageModel } from '../models';
import { ErrorMessages, MessageKeys, MessageSeverities } from '../constants';

export abstract class SummaryChanges<F, M> {

    protected _massageService = inject(MessageService);
    protected _translocoService = inject(TranslocoService);

    protected _destroy$ = new Subject<void>();
    protected _filterSubject = new Subject<void>();

    protected _page: PageModel<F, M>;

    protected constructor(filterFactory: () => F) {
        this._page = new PageModel<F, M>(filterFactory);
    }

    protected _search() {
        this._filterSubject.next();
    }

    protected _copyToClipboard(value: string): void {
        navigator.clipboard.writeText(value).then();
    }

    protected _showSuccessMessage(summary: string, detail: string): void {
        this._massageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.success,
            summary: this._translocoService.translate(summary),
            detail: this._translocoService.translate(detail),
            life: 5000
        });
    }

    protected _showErrorMessage(detail: string | undefined): void {
        this._massageService.add({
            key: MessageKeys.default,
            severity: MessageSeverities.error,
            summary: this._translocoService.translate(ErrorMessages.ops),
            detail: detail,
            life: 5000
        })
    }

    protected _stopWatch(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
