import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ThemesService } from '../services/themes.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../services/modal.service';



@Component({
  selector: 'app-side-menu',
  imports: [ModalComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    private themesService: ThemesService,
    private ModalService: ModalService
  ) {}

  @ViewChild('menuSide', { static: true }) menuSide!: ElementRef<HTMLElement>;

  // logica de los themas
  ngOnInit() {
    if (typeof document !== 'undefined') {
      const dark = this.menuSide.nativeElement.querySelectorAll('.dark');
      const light = this.menuSide.nativeElement.querySelectorAll('.light');

      this.themesService.isDarkMode$.subscribe((isDarkMode) => {
        this.isDarkMode = isDarkMode;
          if (this.isDarkMode) {
            this.renderer.addClass(document.body, 'dark-theme');
            this.renderer.removeClass(document.body, 'light-theme');
            dark?.forEach((element) => {
              this.renderer.addClass(element, 'darkOpen');
              this.renderer.removeClass(element, 'dark');
            });
            light?.forEach((element) => {
              this.renderer.addClass(element, 'lightClose');
            });
          } else {
            this.renderer.addClass(document.body, 'light-theme');
            this.renderer.removeClass(document.body, 'dark-theme');
            dark?.forEach((element) => {
              this.renderer.removeClass(element, 'darkOpen');
              this.renderer.addClass(element, 'dark');
            });
            light?.forEach((element) => {
              this.renderer.removeClass(element, 'lightClose');
            });
          };
      });
    };
  };

  // Boton de los themas
  toggleDarkMode() {
    this.themesService.toggleDarkMode();
  };



  // logica del modal
  toggleActivateMondal() {
    this.ModalService.toggleActivateMondal();
  };
};
