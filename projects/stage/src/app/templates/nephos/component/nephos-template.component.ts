import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {LayoutComponent, LayoutService} from '@iatec/nephos-layout';
import {LogoComponent} from '../components/logo/logo.component';
import {TopbarComponent} from '../components/topbar/topbar.component';
import {ProfileSidebarComponent} from '../components/profile-sidebar/profile-sidebar.component';
import { IconComponent } from "../components/icon/icon.component";


@Component({
    selector: 'app-nephos-template',
    imports: [
        LayoutComponent,
        LogoComponent,
        TopbarComponent,
        ProfileSidebarComponent,
        IconComponent
    ],
    templateUrl: './nephos-template.component.html'
})
export class NephosTemplateComponent implements OnInit {
    private _layoutService = inject(LayoutService);

    @ViewChild(LogoComponent) logoComponent!: LogoComponent;

    ngOnInit(): void {

        this._layoutService.layoutConfig.update(
            (config) => ({
                ...config,
                primary: 'indigo',
                menuMode: 'static',
            }));

        this._layoutService.profile.set({name: 'Apostle Paul', urlAvatar: './assets/images/avatar/example.png'});
    }
}
