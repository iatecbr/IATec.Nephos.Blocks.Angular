import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarItemComponent } from './topbar-item.component';

describe('TopbarItemComponent', () => {
    let component: TopbarItemComponent;
    let fixture: ComponentFixture<TopbarItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TopbarItemComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TopbarItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
