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
import { AppLayoutComponent } from './component/app.layout.component';
import { AppBreadcrumbComponent } from './components/breadcrumb/app.breadcrumb.component';
import { AppSidebarComponent } from './components/sidebar/app.sidebar.component';
import { AppTopbarComponent } from './components/Topbar/app.topbar.component';
import { AppProfileSidebarComponent } from './components/profile-sidebar/app.profilesidebar.component';
import { AppMenuComponent } from './components/menu/component/app.menu.component';
import { AppMenuitemComponent } from './components/menu/components/menuitem/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppBreadcrumbComponent,
        AppSidebarComponent,
        AppTopbarComponent,
        AppProfileSidebarComponent,
        AppMenuComponent,
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
        AppLayoutComponent
    ]
})
export class AppLayoutModule {
}
