import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

import {NephosTemplateComponent} from './nephos-template.component';

describe('NephosTemplateComponent', () => {
    let component: NephosTemplateComponent;
    let fixture: ComponentFixture<NephosTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NephosTemplateComponent],
            providers: [MessageService, ConfirmationService, provideRouter([])]
        })
            .overrideComponent(NephosTemplateComponent, {
                set: {
                    template: ''
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(NephosTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
