import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'nph-layout-slim',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
    templateUrl: './layout-slim.component.html',
    styleUrls: ['./layout-slim.component.scss']
})
export class LayoutSlimComponent {}
