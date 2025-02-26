
import { Component, ViewEncapsulation } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
// import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { FooterMenuComponent } from "./footer-menu/footer-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'omega';

  // menuAbierto = false;
  // constructor(private readonly router: Router) {}
  // toggleMenu() {
  //   this.menuAbierto = !this.menuAbierto;
  // }
}

