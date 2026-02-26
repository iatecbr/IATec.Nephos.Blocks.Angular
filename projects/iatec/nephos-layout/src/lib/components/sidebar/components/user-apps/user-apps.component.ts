import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ButtonDirective} from 'primeng/button';

import {Popover} from 'primeng/popover';
import {UserAppModel} from '../../../../models';

@Component({
    selector: 'nph-layout-sidebar-user-apps',
    imports: [
    ButtonDirective,
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
