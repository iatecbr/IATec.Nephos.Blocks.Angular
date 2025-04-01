import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-dashboard',
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule,  TextareaModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    dropdownItems = [
        {name: 'Option 1', code: 'Option 1'},
        {name: 'Option 2', code: 'Option 2'},
        {name: 'Option 3', code: 'Option 3'}
    ];

    dropdownItem = null;
}
