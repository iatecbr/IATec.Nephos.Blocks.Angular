import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSidebarBlockComponent } from './profile-sidebar-block.component';

describe('ProfileSidebarBlockComponent', () => {
    let component: ProfileSidebarBlockComponent;
    let fixture: ComponentFixture<ProfileSidebarBlockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileSidebarBlockComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileSidebarBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
