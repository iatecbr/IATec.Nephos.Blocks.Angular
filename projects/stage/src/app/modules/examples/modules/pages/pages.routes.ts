import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
    },
    {
        path: 'default',
        component: DefaultComponent,
        data: {
            breadcrumb: 'Default Page Example'
        }
    }
];
