import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LayoutCompactComponent} from './layout-compact.component';
describe('CompactComponent', () => {
    let component: LayoutCompactComponent;
    let fixture: ComponentFixture<LayoutCompactComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutCompactComponent],
            providers: [MessageService, ConfirmationService]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LayoutCompactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
