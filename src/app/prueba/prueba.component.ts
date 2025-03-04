import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidecontentService } from '../services/servicesDesign/sidecontent.service';
import { PruebaService } from '../services/servicesDesign/prueba.service';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent implements OnInit {

  @ViewChild('prueba', { static: true }) prueba!: ElementRef<HTMLElement>;

    isActiveprueba: boolean = false;
    activateSideContent: boolean = false;

    constructor(
      private SidecontentService: SidecontentService,
      private PruebaService: PruebaService,
      private renderer: Renderer2,
    ) { }

    ngOnInit(): void {

      this.PruebaService.prueba.subscribe((value) => {
        this.isActiveprueba = value;
        //if(this.isOpenInfoUser) {
          this.renderer.removeClass(this.prueba.nativeElement, 'contentPrueba');
          this.renderer.addClass(this.prueba.nativeElement, 'contentPruebaActive');
        //}
      });

      this.SidecontentService.activateSideContent.subscribe((value) => {
        this.activateSideContent = value;
        if(!this.activateSideContent) {
          console.log(this.activateSideContent);
          this.renderer.addClass(this.prueba.nativeElement, 'contentPrueba');
          this.renderer.removeClass(this.prueba.nativeElement, 'contentPruebaActive');
        }
      });
    };

}
