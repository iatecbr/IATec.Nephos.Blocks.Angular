import { Component, effect, OnInit, ViewEncapsulation } from '@angular/core';
import {
    AppConfig,
    LanguageModel,
    LayoutService,
    MenuService,
    NephosLayoutModule,
    UserAppModel
} from '@iatec/nephos-layout';
import { PrimeNGConfig } from 'primeng/api';
import { HttpMenuService, LanguageService } from '../../services';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'nephos-template',
    standalone: true,
    imports: [
        NephosLayoutModule,
        ButtonModule,
        OverlayPanelModule,
        CommonModule,
        SkeletonModule,
        DropdownModule,
        FormsModule
    ],
    templateUrl: './nephos-template.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NephosTemplateComponent implements OnInit {
    name: string | undefined;

    apps: UserAppModel[] = [
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-components.svg',
            name: 'App 1',
            url: 'https://www.primefaces.org/primeng'
        },
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-community.svg',
            name: 'App 2'
        },
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-productivity.svg',
            name: 'App 3'
        },
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-accessibility.svg',
            name: 'App 4'
        },
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-support.svg',
            name: 'App 5'
        },
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-mobile.svg',
            name: 'App 6'
        },
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-theme.svg',
            name: 'App 7'
        },
        {
            icon: 'https://apollo.primeng.org/assets/demo/images/landing/icon-ts.svg',
            name: 'App 8'
        }
    ];

    languages: LanguageModel[] = [];
    selectedLanguage: LanguageModel | undefined;

    constructor(
        private _primengConfig: PrimeNGConfig,
        private _layoutService: LayoutService,
        private _menuService: MenuService,
        private _httpMenuService: HttpMenuService,
        private _languageService: LanguageService
    ) {
        effect(() => {
            const profile = this._layoutService.profile();
            this.name = profile.name;
        });
    }

    ngOnInit(): void {
        this._primengConfig.ripple = true;

        //optional configuration with the default configuration
        const config: AppConfig = {
            ripple: true,                      //toggles ripple on and off
            inputStyle: 'outlined',             //default style for input elements
            menuMode: 'static',                 //layout mode of the menu, valid values are "static", "overlay", "slim", "horizontal", "reveal" and "drawer"
            colorScheme: 'light',               //color scheme of the template, valid values are "light", "dim" and "dark"
            theme: 'indigo',                    //default component theme for PrimeNG
            menuTheme: 'colorScheme',           //theme of the menu, valid values are "colorScheme", "primaryColor" and "transparent"
            scale: 14                           //size of the body font size to scale the whole application
        };

        this._layoutService.config.set(config);

        this._layoutService.profile.set({name: 'Apostle Paul', urlAvatar: './assets/images/avatar/example.png'});

        this._getLanguages();
        this._getMenus();
    }

    private _getMenus(): void {
        this._httpMenuService.getMenus().subscribe(menus => {
            this._menuService.menus = menus;
        });
    }

    private _getLanguages() {
        this._languageService.getLanguages()
            .subscribe(x => {
                this.languages = x;
                this._afterGetLanguages();
            });
    }

    private _afterGetLanguages(): void {
        const lang = localStorage.getItem('lang');

        //this._translateService.setAvailableLangs(this.languages.map(x => `${x.code}-${x.country.code}`));

        this.selectedLanguage = this.languages.find(x => x.code === lang?.split('-')[0]
            && x.country.code === lang?.split('-')[1]) || this.languages[0];
    }

    onCommentClick() {
        console.log('Comment clicked');
    }

    onProfileClick() {
        console.log('Profile clicked');
    }

    onSignOutClick() {
        console.log('SignOut clicked');
    }

    onChangeSelectedLanguage(options: LanguageModel | undefined) {
        console.log('Language changed');
    }
}
