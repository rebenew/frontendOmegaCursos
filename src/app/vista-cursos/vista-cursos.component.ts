import { Component } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { FooterMenuComponent } from '../footer-menu/footer-menu.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-vista-cursos',
  imports: [SideMenuComponent, FooterMenuComponent, RouterOutlet],
  templateUrl: './vista-cursos.component.html',
  styleUrl: './vista-cursos.component.scss'
})
export class VistaCursosComponent {



};
