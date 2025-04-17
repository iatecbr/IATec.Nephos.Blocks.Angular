import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TopbarItemComponent } from '../topbar-item/topbar-item.component';
import { ButtonDirective } from 'primeng/button';
import { NgForOf } from '@angular/common';
import { Popover } from 'primeng/popover';
import { UserAppModel } from '../../../../models';

@Component({
    selector: 'nph-layout-topbar-user-apps',
    imports: [
        TopbarItemComponent,
        ButtonDirective,
        NgForOf,
        Popover
    ],
    templateUrl: './user-apps.component.html'
})
export class UserAppsComponent {
    @Input() apps: UserAppModel[] | undefined = [];

    constructor(private _router: Router) {
    }

    public navigateTo(app: UserAppModel) {
        app.routerLink ?
            this._router.navigate([app.routerLink]).then() :
            window.location.href = app.url as string;
    }
}
