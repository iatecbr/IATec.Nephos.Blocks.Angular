import {Component, ContentChild, TemplateRef} from '@angular/core';
import {LayoutConfigurator} from '../../components/configurator/layout.configurator';
import {Toast} from 'primeng/toast';
import {NgTemplateOutlet} from '@angular/common';
import {ProfileSidebarComponent, TopbarComponent} from '../../components';
import {RouterOutlet} from '@angular/router';
import {ConfirmDialog} from "primeng/confirmdialog";


@Component({
    selector: 'nph-layout-compact',
    imports: [
        LayoutConfigurator,
        Toast,
        ConfirmDialog,
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
