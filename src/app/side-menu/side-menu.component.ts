import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  darkTheme: boolean = false;
  constructor(private renderer: Renderer2) {}

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
