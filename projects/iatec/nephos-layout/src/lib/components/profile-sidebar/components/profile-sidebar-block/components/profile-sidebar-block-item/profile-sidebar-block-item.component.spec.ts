import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSidebarBlockItemComponent} from './profile-sidebar-block-item.component';

describe('ProfileSidebarBlockItemComponent', () => {
    let component: ProfileSidebarBlockItemComponent;
    let fixture: ComponentFixture<ProfileSidebarBlockItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileSidebarBlockItemComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileSidebarBlockItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
