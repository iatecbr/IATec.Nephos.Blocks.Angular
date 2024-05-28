import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConfig, LayoutService, NephosLayoutModule } from '@iatec/nephos-layout';
import { PrimeNGConfig } from 'primeng/api';
import { LogoComponent } from '../components/logo/logo.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { ProfileSidebarComponent } from '../components/profile-sidebar/profile-sidebar.component';


@Component({
    selector: 'app-nephos-template',
    standalone: true,
    imports: [
        NephosLayoutModule,
        LogoComponent,
        TopbarComponent,
        ProfileSidebarComponent
    ],
    templateUrl: './nephos-template.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NephosTemplateComponent implements OnInit {


    constructor(
        private _primengConfig: PrimeNGConfig,
        private _layoutService: LayoutService
    ) {

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
    }


}
