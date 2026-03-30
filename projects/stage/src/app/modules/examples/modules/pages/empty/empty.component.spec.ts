import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EmptyPageComponent} from '@iatec/nephos-pages';

import {EmptyComponent} from './empty.component';

describe('DefaultComponent', () => {
    let component: EmptyComponent;
    let fixture: ComponentFixture<EmptyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmptyComponent],
            imports: [EmptyPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EmptyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
