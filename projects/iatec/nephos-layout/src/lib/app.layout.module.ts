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
import { AppConfigModule } from './config/app.config.module';
import { LayoutComponent } from './component/layout.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { MenuComponent } from './components/menu/component/menu.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './components/menu/components/menu-item/menu-item.component';

@NgModule({
    declarations: [
        LayoutComponent,
        BreadcrumbComponent,
        SidebarComponent,
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
        RouterModule,
        AppConfigModule
    ],
    exports: [
        LayoutComponent
    ]
})
export class AppLayoutModule {
}
