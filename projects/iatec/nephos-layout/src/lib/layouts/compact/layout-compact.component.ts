import { Component, ContentChild, TemplateRef } from '@angular/core';
import { LayoutConfigurator } from '../../components/configurator/layout.configurator';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { Toast } from 'primeng/toast';
import { BreadcrumbComponent } from '../../components/breadcrumb';
import { NgTemplateOutlet } from '@angular/common';
import {ProfileSidebarComponent, TopbarComponent} from '../../components';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'nph-layout-compact',
    imports: [
        LayoutConfigurator,
        ConfirmPopup,
        Toast,
        BreadcrumbComponent,
        NgTemplateOutlet,
        RouterOutlet,
        TopbarComponent,
        ProfileSidebarComponent
    ],
    templateUrl: './layout-compact.component.html',
    styleUrls: ['./layout-compact.component.scss'],
})
export class LayoutCompactComponent {
    @ContentChild('topbar') topbar!: TemplateRef<unknown>;
    @ContentChild('profileSidebar') profileSidebar!: TemplateRef<unknown>;
}
