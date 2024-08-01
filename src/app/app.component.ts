import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'aemet-marc-frontend';

  constructor(
    private readonly matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

}
