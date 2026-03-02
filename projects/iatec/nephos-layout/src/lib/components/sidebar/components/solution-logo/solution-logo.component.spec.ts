import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SolutionLogoComponent} from './solution-logo.component';

describe('SolutionLogoComponent', () => {
    let component: SolutionLogoComponent;
    let fixture: ComponentFixture<SolutionLogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SolutionLogoComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SolutionLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
