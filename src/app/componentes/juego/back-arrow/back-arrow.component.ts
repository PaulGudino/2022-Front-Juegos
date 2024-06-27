import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.css']
})
export class BackArrowComponent {
  @Input() enabled: boolean = true; // Propiedad de entrada para habilitar/deshabilitar el botón
  constructor(private location: Location) {}

  goBack(): void {
    if (this.enabled) {
      this.location.back();
    }
  }
}
