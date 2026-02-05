import {Routes} from '@angular/router';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {NephosTemplateComponent} from './templates/nephos/component/nephos-template.component';
import { LayoutSlimComponent } from '../../../iatec/nephos-layout/src/lib/layouts/slim/layout-slim.component';

export const routes: Routes = [
    {
        path: 'slim-v3',
        component: LayoutSlimComponent,
    },
    {
        path: '',
        component: NephosTemplateComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: {
                    breadcrumb: 'Exemplo de Dashboard'
                }
            },
            {
                path: 'examples',
                loadChildren: () => import('./modules/examples/examples.module').then(m => m.ExamplesModule),
                data: {
                    breadcrumb: 'Examples'
                }

            }
        ]
    }
];
