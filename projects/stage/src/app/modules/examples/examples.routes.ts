import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
    },
    {
        path: 'pages',
        loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule),
        data: {
            breadcrumb: 'Pages'
        }
    }
];
