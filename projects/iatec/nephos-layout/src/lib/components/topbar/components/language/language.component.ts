import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { Select } from 'primeng/select';
import { LanguageModel } from '../../../../models';

@Component({
    selector: 'nph-layout-topbar-language',
    templateUrl: './language.component.html',
    imports: [
        PrimeTemplate,
        FormsModule,
        Skeleton,
        Select,
        LowerCasePipe,
        UpperCasePipe
    ],
    styleUrl: './language.component.scss'
})
export class LanguageComponent {
    @Input() languages: LanguageModel[] = [];
    @Input() selectedLanguage: LanguageModel | undefined;
    @Input() flagBaseUrl: string = 'https://assets-services.sdasystems.org/images/flags/1x1/';
    @Output() selectedLanguageChange: EventEmitter<LanguageModel | undefined> = new EventEmitter<LanguageModel | undefined>();

    onChangeSelectedLanguage(option: LanguageModel | undefined) {
        this.selectedLanguageChange.emit(option);
    }
}
