import { Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
    },
    {
        path: 'default',
        component: EmptyComponent,
        data: {
            breadcrumb: 'Default Page Example'
        }
    }
];
