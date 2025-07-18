import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSidebarBlockTitleComponent} from './profile-sidebar-block-title.component';

describe('ProfileSidebarBlockTitleComponent', () => {
    let component: ProfileSidebarBlockTitleComponent;
    let fixture: ComponentFixture<ProfileSidebarBlockTitleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileSidebarBlockTitleComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileSidebarBlockTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
