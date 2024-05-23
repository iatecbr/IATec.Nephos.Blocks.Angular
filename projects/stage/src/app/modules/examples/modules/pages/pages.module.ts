import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './pages.routes';
import { DefaultComponent } from './default/default.component';


@NgModule({
    declarations: [
        DefaultComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class PagesModule {
}
