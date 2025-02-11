import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { log } from 'node:console';
import { SideMenuService } from '../services/side-menu.service';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent  {
  darkTheme: boolean = false;
  MenuOpen: boolean = false;

  constructor(private renderer: Renderer2, private sideMenuService: SideMenuService) {}

  @ViewChild('theme', { static: true }) theme!: ElementRef<HTMLElement>;
  @ViewChild('menuSide', { static: true }) menuSide!: ElementRef<HTMLElement>;
  @ViewChild('openMenu', { static: true }) openMenu!: ElementRef<HTMLElement>;



  ngAfterViewInit(){

    const theme = this.theme.nativeElement;
    const dark = theme.querySelector('.dark')
    const light = theme.querySelector('.light')

    theme.addEventListener('click', ()=>{
      this.darkTheme = !this.darkTheme;
      if (this.darkTheme) {
        this.renderer.addClass(document.body, 'dark-theme');
        this.renderer.removeClass(document.body, 'light-theme');
        dark?.classList.add('darkOpen')
        light?.classList.add('lightOpen')

      } else {
        this.renderer.addClass(document.body, 'light-theme');
        this.renderer.removeClass(document.body, 'dark-theme');
        dark?.classList.remove('darkOpen')
        light?.classList.remove('lightOpen')

      }
    })


    const openMenu = this.openMenu.nativeElement;
    const textMenu = this.menuSide.nativeElement.querySelectorAll('.textMenu');
    const elemetMenu = this.menuSide.nativeElement.querySelectorAll('.elemetMenu');
    const childrenMenu = this.menuSide.nativeElement.querySelectorAll('.childrenMenu');

    openMenu.addEventListener('click', ()=>{
      this.MenuOpen = !this.MenuOpen;

      this.sideMenuService.stateMenuOpen(this.MenuOpen);

      if(this.MenuOpen){
        this.menuSide.nativeElement.classList.add('menuSideOpen')
        textMenu.forEach(element =>{
          element.classList.add('textMenuOpen')
        })
        elemetMenu.forEach(element=>{
          element.classList.remove('elemetMenu')
          element.classList.add('elemetMenuOpen')
        })
        childrenMenu.forEach(element=>{
          element.classList.add('childrenMenuOpen')
        })
      }else{
        this.menuSide.nativeElement.classList.remove('menuSideOpen')
        textMenu.forEach(element =>{
          element.classList.remove('textMenuOpen')
        })
        elemetMenu.forEach(element=>{
          element.classList.add('elemetMenu')
          element.classList.remove('elemetMenuOpen')
        })
        childrenMenu.forEach(element=>{
          element.classList.remove('childrenMenuOpen')
        })
      }
    })
  }

}
