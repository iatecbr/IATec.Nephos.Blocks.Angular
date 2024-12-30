import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { LanguageModel } from '../../../../models';

@Component({
    selector: 'nph-layout-topbar-language',
    templateUrl: './language.component.html',
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
