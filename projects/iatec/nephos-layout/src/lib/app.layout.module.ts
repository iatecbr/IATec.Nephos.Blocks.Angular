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
import { AppSidebarComponent } from './components/sidebar/app.sidebar.component';
import { AppTopbarComponent } from './components/Topbar/app.topbar.component';
import { AppProfileSidebarComponent } from './components/profile-sidebar/app.profilesidebar.component';
import { MenuComponent } from './components/menu/component/menu.component';
import { AppMenuitemComponent } from './components/menu/components/menuitem/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LayoutComponent,
        BreadcrumbComponent,
        AppSidebarComponent,
        AppTopbarComponent,
        AppProfileSidebarComponent,
        MenuComponent,
        AppMenuitemComponent
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
