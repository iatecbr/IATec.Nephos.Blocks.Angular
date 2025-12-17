import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import {Skeleton} from 'primeng/skeleton';
import {Select} from 'primeng/select';
import {LanguageModel} from '../../../../models';

@Component({
    selector: 'nph-layout-topbar-language',
    templateUrl: './language.component.html',
    imports: [
    PrimeTemplate,
    FormsModule,
    UpperCasePipe,
    Skeleton,
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
