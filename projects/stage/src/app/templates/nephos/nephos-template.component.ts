import { Component, effect, OnInit } from '@angular/core';
import { AppConfig, LayoutService, MenuService, NephosLayoutModule } from '@iatec/nephos-layout';
import { PrimeNGConfig } from 'primeng/api';
import { HttpMenuService } from '../../services';

@Component({
    selector: 'nephos-template',
    standalone: true,
    imports: [
        NephosLayoutModule
    ],
    templateUrl: './nephos-template.component.html'
})
export class NephosTemplateComponent implements OnInit {
    name: string | undefined;

    constructor(
        private _primengConfig: PrimeNGConfig,
        private _layoutService: LayoutService,
        private _menuService: MenuService,
        private _httpMenuService: HttpMenuService
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

        this._getMenus();
    }

    private _getMenus(): void {
        this._httpMenuService.getMenus().subscribe(menus => {
            this._menuService.menus = menus;
        });
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
}
