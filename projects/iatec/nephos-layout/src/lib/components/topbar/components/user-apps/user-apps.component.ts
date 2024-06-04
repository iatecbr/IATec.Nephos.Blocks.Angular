import { Component, Input } from '@angular/core';
import { UserAppModel } from '../../../../models';
import { Router } from '@angular/router';

@Component({
    selector: 'nph-layout-topbar-user-apps',
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
