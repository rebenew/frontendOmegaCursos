import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FooterMenuComponent } from "../../footer-menu/footer-menu.component";

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, FooterMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  menuAbierto = false;
  constructor(private readonly router: Router) { }
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}
