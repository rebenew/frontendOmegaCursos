import { Component } from '@angular/core';
import { SideMenuComponent } from "../../side-menu/side-menu.component";
import { FooterMenuComponent } from "../../footer-menu/footer-menu.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-homelayout',
  imports: [SideMenuComponent, FooterMenuComponent, NavbarComponent, RouterOutlet ],
  templateUrl: './homelayout.component.html',
  styleUrl: './homelayout.component.scss'
})
export class HomelayoutComponent {

}
