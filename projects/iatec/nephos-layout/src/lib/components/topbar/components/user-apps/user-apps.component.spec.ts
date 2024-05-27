import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppsComponent } from './user-apps.component';

describe('UserAppsComponent', () => {
    let component: UserAppsComponent;
    let fixture: ComponentFixture<UserAppsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserAppsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserAppsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
