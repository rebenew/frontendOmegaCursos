
import { Component, ViewEncapsulation } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'omega';

  menuAbierto = false;
  constructor(private readonly router: Router) {}
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}

