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
import { LanguageComponent, TopbarComponent, TopbarItemComponent } from './components/topbar';
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
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslocoPipe } from '@jsverse/transloco';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
    declarations: [
        LayoutComponent,
        BreadcrumbComponent,
        SidebarComponent,
        TopbarComponent,
        TopbarItemComponent,
        UserAppsComponent,
        LanguageComponent,
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
        LanguageComponent,
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
        OverlayPanelModule,
        PaginatorModule,
        SkeletonModule,
        TranslocoPipe,
        ToastModule,
        ConfirmPopupModule,
        MenubarModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class NephosLayoutModule {
}
