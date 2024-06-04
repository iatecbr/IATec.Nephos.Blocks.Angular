import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './pages.routes';
import { EmptyComponent } from './empty/empty.component';
import { EmptyPageComponent } from '@iatec/nephos-pages';


@NgModule({
    declarations: [
        EmptyComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EmptyPageComponent
    ]
})
export class PagesModule {
}
