import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent,FooterMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'omega';

}
