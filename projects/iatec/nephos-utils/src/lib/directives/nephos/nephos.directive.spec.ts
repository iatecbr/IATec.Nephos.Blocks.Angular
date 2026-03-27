import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NephosDirective} from './nephos.directive';
@Component({
    template: '<ng-template nphTemplate="test"></ng-template>',
    standalone: true,
    imports: [NephosDirective]
})
class TestHostComponent {
    @ViewChild(NephosDirective) directive!: NephosDirective;
}
describe('NephosDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });
    it('should create an instance', () => {
        expect(fixture.componentInstance.directive).toBeTruthy();
    });
});
