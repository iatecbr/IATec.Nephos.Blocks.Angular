import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { LayoutComponent } from './component';
import { BreadcrumbComponent } from './components/breadcrumb';
import { SidebarComponent, SidebarLogoComponent } from './components/sidebar';
import { TopbarComponent } from './components/topbar';
import { ProfileSidebarComponent } from './components/profile-sidebar';
import { MenuComponent, MenuItemComponent } from './components/menu';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        LayoutComponent,
        BreadcrumbComponent,
        SidebarComponent,
        SidebarLogoComponent,
        TopbarComponent,
        ProfileSidebarComponent,
        MenuComponent,
        MenuItemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        ButtonModule,
        TooltipModule,
        RippleModule,
        RouterModule
    ],
    exports: [
        LayoutComponent,
        BreadcrumbComponent,
        SidebarLogoComponent
    ]
})
export class NephosLayoutModule {
}
