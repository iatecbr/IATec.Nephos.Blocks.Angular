import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NephosTemplateComponent } from './templates/nephos/nephos-template.component';

export const routes: Routes = [
    {
        path: '',
        component: NephosTemplateComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            }
        ]
    }
];
