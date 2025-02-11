import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VistaCursosComponent } from './vista-cursos/vista-cursos.component';
import { SideMenuService } from './services/side-menu.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VistaCursosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[SideMenuService]
})
export class AppComponent {
  title = 'omega';

}
