import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './pages.routes';
import {EmptyComponent} from './empty/empty.component';
import {EmptyPageComponent, HeaderPageComponent} from '@iatec/nephos-pages';
import {HeaderComponent} from './header/header.component';


@NgModule({
    declarations: [
        EmptyComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EmptyPageComponent,
        HeaderPageComponent
    ]
})
export class PagesModule {
}
