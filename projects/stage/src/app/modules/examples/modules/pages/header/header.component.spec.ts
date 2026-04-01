import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderPageComponent} from '@iatec/nephos-pages';

import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent, HeaderPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
