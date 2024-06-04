import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSidebarBlockSubtitleComponent } from './profile-sidebar-block-subtitle.component';

describe('ProfileSidebarBlockSubtitleComponent', () => {
    let component: ProfileSidebarBlockSubtitleComponent;
    let fixture: ComponentFixture<ProfileSidebarBlockSubtitleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileSidebarBlockSubtitleComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileSidebarBlockSubtitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
