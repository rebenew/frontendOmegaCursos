import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuService } from './services/side-menu.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[SideMenuService]
})
export class AppComponent {
  title = 'omega';

}
