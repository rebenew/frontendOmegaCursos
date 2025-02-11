import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { FooterMenuComponent } from '../footer-menu/footer-menu.component';
import { SideMenuService } from '../services/side-menu.service';

@Component({
  selector: 'app-vista-cursos',
  imports: [SideMenuComponent, FooterMenuComponent],
  templateUrl: './vista-cursos.component.html',
  styleUrl: './vista-cursos.component.scss'
})
export class VistaCursosComponent implements AfterViewInit {

@ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  menuOpen:boolean = false;

  constructor(private sideMenuService: SideMenuService ){}

  ngAfterViewInit(): void {
    this.sideMenuService.menuOpen.subscribe(valor =>{
      this.menuOpen = valor;
      const content = this.content.nativeElement;
      if(this.menuOpen){
        content.classList.add('contentOpen');
      }else{
        content.classList.remove('contentOpen');
      };
    });
  };

};
