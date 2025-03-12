import { Component, ElementRef, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';
import { SideMenuComponent } from "../../side-menu/side-menu.component";
import { FooterMenuComponent } from "../../footer-menu/footer-menu.component";
import { RouterOutlet } from '@angular/router';
import { hideMenuService } from '../../services/servicesDesign/hidemenu.service';
import { SidecontentComponent } from '../../sidecontent/sidecontent.component';
import { SidecontentService } from '../../services/servicesDesign/sidecontent.service';
import { ChatBotComponent } from "../../chat-bot/chat-bot.component";


@Component({
  selector: 'app-homelayout',
  imports: [SideMenuComponent, FooterMenuComponent, RouterOutlet, SidecontentComponent, ChatBotComponent],
  templateUrl: './homelayout.component.html',
  styleUrl: './homelayout.component.scss'
})
export class HomelayoutComponent implements OnInit {

  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  hideMenu: boolean = false;
  activateSideContent: boolean = false;

  constructor (
    private hideMenuService: hideMenuService,
    private sidecontentService: SidecontentService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {

    // logica de ocultar menu
    const content = this.content.nativeElement;

    this.hideMenuService.hideMenu.subscribe((hideMenu) => {
      this.hideMenu = hideMenu;

      if (this.hideMenu) {
        this.renderer.addClass(content, 'content0');
      } else {
        this.renderer.removeClass(content, 'content0');
      }
    });

    // logica de side content

    this.sidecontentService.activateSideContent.subscribe((value) => {
      this.activateSideContent = value;
      if (this.activateSideContent) {
        this.renderer.addClass(content, 'openSideContent');
      } else {
        this.renderer.removeClass(content, 'openSideContent');
      };
    });
  };
};
