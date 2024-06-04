import { TestBed } from '@angular/core/testing';

import { HttpLanguageService } from './http-language.service';

describe('LanguageService', () => {
    let service: HttpLanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HttpLanguageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
