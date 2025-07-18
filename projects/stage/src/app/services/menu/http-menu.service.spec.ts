import {TestBed} from '@angular/core/testing';

import {HttpMenuService} from './http-menu.service';

describe('MenuService', () => {
    let service: HttpMenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HttpMenuService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
