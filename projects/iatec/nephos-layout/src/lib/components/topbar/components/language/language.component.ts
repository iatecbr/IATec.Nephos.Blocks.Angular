import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageModel } from '../../../../models/test';
import { PrimeTemplate } from 'primeng/api';
import { TopbarItemComponent } from '../topbar-item/topbar-item.component';
import { FormsModule } from '@angular/forms';
import { NgIf, UpperCasePipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { Select } from 'primeng/select';

@Component({
    selector: 'nph-layout-topbar-language',
    templateUrl: './language.component.html',
    imports: [
        PrimeTemplate,
        TopbarItemComponent,
        FormsModule,
        UpperCasePipe,
        Skeleton,
        NgIf,
        Select
    ],
    styleUrl: './language.component.scss'
})
export class LanguageComponent {
    @Input() languages: LanguageModel[] = [];
    @Input() selectedLanguage: LanguageModel | undefined;
    @Output() selectedLanguageChange: EventEmitter<LanguageModel | undefined> = new EventEmitter<LanguageModel | undefined>();

    onChangeSelectedLanguage(option: LanguageModel | undefined) {
        this.selectedLanguageChange.emit(option);
    }
}
