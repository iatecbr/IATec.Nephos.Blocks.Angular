import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLogoComponent } from './sidebar-logo.component';

describe('SideLogoComponent', () => {
    let component: SidebarLogoComponent;
    let fixture: ComponentFixture<SidebarLogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarLogoComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SidebarLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
