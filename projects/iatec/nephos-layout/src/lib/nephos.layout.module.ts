import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { LayoutComponent } from './component';
import { BreadcrumbComponent } from './components/breadcrumb';
import { SidebarComponent } from './components/sidebar';
import { TopbarComponent, TopbarItemComponent } from './components/topbar';
import {
    ProfileSidebarBlockComponent,
    ProfileSidebarBlockItemComponent,
    ProfileSidebarBlockSubtitleComponent,
    ProfileSidebarBlockTitleComponent,
    ProfileSidebarComponent
} from './components/profile-sidebar';
import { MenuComponent, MenuItemComponent } from './components/menu';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UserAppsComponent } from './components/topbar/components/user-apps/user-apps.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
    declarations: [
        LayoutComponent,
        BreadcrumbComponent,
        SidebarComponent,
        TopbarComponent,
        TopbarItemComponent,
        UserAppsComponent,
        ProfileSidebarComponent,
        ProfileSidebarBlockComponent,
        ProfileSidebarBlockTitleComponent,
        ProfileSidebarBlockSubtitleComponent,
        ProfileSidebarBlockItemComponent,
        MenuComponent,
        MenuItemComponent
    ],
    exports: [
        LayoutComponent,
        TopbarItemComponent,
        UserAppsComponent,
        ProfileSidebarBlockComponent,
        ProfileSidebarBlockTitleComponent,
        ProfileSidebarBlockSubtitleComponent,
        ProfileSidebarBlockItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        ButtonModule,
        TooltipModule,
        RippleModule,
        RouterModule,
        OverlayPanelModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class NephosLayoutModule {
}
