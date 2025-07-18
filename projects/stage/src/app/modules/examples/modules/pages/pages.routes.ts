import {Routes} from '@angular/router';
import {EmptyComponent} from './empty/empty.component';
import {HeaderComponent} from './header/header.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
    },
    {
        path: 'empty',
        component: EmptyComponent,
        data: {
            breadcrumb: 'Empty Example'
        }
    },
    {
        path: 'header',
        component: HeaderComponent,
        data: {
            breadcrumb: 'Header Example'
        }
    }
];
