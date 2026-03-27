import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TranslocoService} from '@jsverse/transloco';
import {ErrorService} from './error.service';
describe('ErrorService', () => {
    let service: ErrorService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                {provide: MessageService, useValue: {add: () => undefined}},
                {provide: Router, useValue: {navigate: () => Promise.resolve(true)}},
                {provide: TranslocoService, useValue: {translate: (key: string) => key}}
            ]
        });
        service = TestBed.inject(ErrorService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
