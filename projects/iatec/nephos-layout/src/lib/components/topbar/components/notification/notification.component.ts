import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from "primeng/button";

@Component({
    selector: 'nph-layout-topbar-notification',
    templateUrl: './notification.component.html',
    imports: [
        FormsModule,
        ButtonDirective
    ],
    styleUrl: './notification.component.scss'
})
export class NotificationComponent {

}
