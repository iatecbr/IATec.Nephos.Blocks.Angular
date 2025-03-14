import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutComponent, LayoutService } from '@iatec/nephos-layout';
import { LogoComponent } from '../components/logo/logo.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { ProfileSidebarComponent } from '../components/profile-sidebar/profile-sidebar.component';

@Component({
    selector: 'app-nephos-template',
    imports: [
        LayoutComponent,
        LogoComponent,
        TopbarComponent,
        ProfileSidebarComponent
    ],
    templateUrl: './nephos-template.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NephosTemplateComponent implements OnInit {

    constructor(
        private _layoutService: LayoutService
    ) {
    }

    ngOnInit(): void {

        this._layoutService.layoutConfig.update(
            (config) => ({
                ...config,
                menuMode: 'slim'
            }));


        this._layoutService.profile.set({name: 'Apostle Paul', urlAvatar: './assets/images/avatar/example.png'});
    }
}
