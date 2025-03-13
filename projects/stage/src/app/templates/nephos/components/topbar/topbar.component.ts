import { Component, HostBinding, OnInit } from '@angular/core';
import { LanguageModel, MenuService, NephosLayoutModule, UserAppModel } from '@iatec/nephos-layout';
import { HttpAppService, HttpLanguageService, HttpMenuService } from '../../../../services';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-nephos-template-topbar',
    imports: [
        NephosLayoutModule
    ],
    templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
    @HostBinding('class') class = `flex`;

    apps: UserAppModel[] = [];

    languages: LanguageModel[] = [];
    selectedLanguage: LanguageModel | undefined;

    constructor(
        private _menuService: MenuService,
        private _httpMenuService: HttpMenuService,
        private _languageService: HttpLanguageService,
        private _appsService: HttpAppService
    ) {
    }

    ngOnInit(): void {
        this._getDependencies();
    }

    private _getDependencies() {
        forkJoin([
            this._httpMenuService.getMenus(),
            this._languageService.getLanguages(),
            this._appsService.getApps()
        ]).subscribe(([
                          menus, languages, apps
                      ]) => {
            this._menuService.menus = menus;
            this.languages = languages;
            this.apps = apps;

            this._afterGetLanguages();
        });
    }

    private _afterGetLanguages(): void {
        const lang = localStorage.getItem('lang');

        //this._translateService.setAvailableLangs(this.languages.map(x => `${x.code}-${x.country.code}`));

        this.selectedLanguage = this.languages.find(x => x.code === lang?.split('-')[0]
            && x.country.code === lang?.split('-')[1]) || this.languages[0];
    }
}
