import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InfoUserService } from '../../services/servicesDesign/info-user.service';
import { SidecontentService } from '../../services/servicesDesign/sidecontent.service';

@Component({
  selector: 'app-infouser',
  imports: [],
  templateUrl: './infouser.component.html',
  styleUrl: './infouser.component.scss'
})
export class InfouserComponent implements OnInit{

  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  isOpenInfoUser: boolean = false;
  activateSideContent: boolean = false;

  constructor(
    private SidecontentService: SidecontentService,
    private infoUserService: InfoUserService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {

    this.infoUserService.openInfoUser.subscribe((value) => {
      this.isOpenInfoUser = value;
      //if(this.isOpenInfoUser) {
        this.renderer.removeClass(this.content.nativeElement, 'content');
        this.renderer.addClass(this.content.nativeElement, 'contentActive');
      //}
    });

    this.SidecontentService.activateSideContent.subscribe((value) => {
      this.activateSideContent = value;
      if(!this.activateSideContent) {
        console.log(this.activateSideContent);
        this.renderer.addClass(this.content.nativeElement, 'content');
        this.renderer.removeClass(this.content.nativeElement, 'contentActive');
      }
    });
  };
};
