import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidecontentService } from '../../services/servicesDesign/sidecontent.service';

@Component({
  selector: 'home-student',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.scss',
})
export class HomeStudentComponent implements OnInit {
  protected visible: boolean = false;
  activateSideContent: boolean = false;

  @ViewChild('contentCards', { static: true }) contentCards!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private SidecontentService: SidecontentService,
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      //console.log(this.contentCards.nativeElement);
      const cardCourses = this.contentCards.nativeElement.querySelectorAll('.card-courses');
      //console.log(cardCourses);

      this.SidecontentService.activateSideContent.subscribe((value) => {
        this.activateSideContent = value;
        if (this.activateSideContent) {
          cardCourses?.forEach((element) => {
            this.renderer.addClass(element, 'openSideContentCourses');
          });
        } else {
          cardCourses?.forEach((element) => {
            this.renderer.removeClass(element, 'openSideContentCourses');
          });
        }
      });
    }, 1000);
  }
}
