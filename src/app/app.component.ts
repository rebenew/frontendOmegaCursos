import { ViewEncapsulation } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'omega';

  menuAbierto = false;
  constructor(private readonly router: Router) { }
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

}

