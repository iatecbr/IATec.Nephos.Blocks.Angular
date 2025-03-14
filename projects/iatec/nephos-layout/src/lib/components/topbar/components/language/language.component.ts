import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { LanguageModel } from '../../../../models';
import { PrimeTemplate } from 'primeng/api';
import { TopbarItemComponent } from '../topbar-item/topbar-item.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgIf, UpperCasePipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';

@Component({
    selector: 'nph-layout-topbar-language',
    templateUrl: './language.component.html',
    imports: [
        PrimeTemplate,
        TopbarItemComponent,
        DropdownModule,
        FormsModule,
        UpperCasePipe,
        Skeleton,
        NgIf
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
