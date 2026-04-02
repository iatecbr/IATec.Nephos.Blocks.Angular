import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {MenuService} from '@iatec/nephos-layout';

import {TopbarComponent} from './topbar.component';
import {HttpAppService, HttpLanguageService, HttpMenuService} from '../../../../services';

describe('TopbarComponent', () => {
    let component: TopbarComponent;
    let fixture: ComponentFixture<TopbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TopbarComponent],
            providers: [
                MenuService,
                {
                    provide: HttpMenuService,
                    useValue: {
                        getMenus: () => of([])
                    }
                },
                {
                    provide: HttpLanguageService,
                    useValue: {
                        getLanguages: () => of([])
                    }
                },
                {
                    provide: HttpAppService,
                    useValue: {
                        getApps: () => of([])
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TopbarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
