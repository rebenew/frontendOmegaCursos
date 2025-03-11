import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CourseContentService } from '../../services/students-dashboard-services/course-content.service';
import {
  Contenido,
  CourseContent,
} from '../../interfaces/resources_IA_para_todos.interface';

@Component({
  selector: 'course-content',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
})
export class CourseContentComponent implements OnInit {
  public course?: CourseContent;
  public visibleUnit: boolean[] = [];
  public selectedContent: Contenido | null = null;
  public activeButton: any;

  constructor(
    private courseContentService: CourseContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.courseContentService
      .getCourseContent()
      .subscribe((data: CourseContent) => {
        this.course = data;
        this.visibleUnit = new Array(this.course.content.length).fill(false);

        if (this.course.content.length > 0) {
          this.showContent(this.course.content[0].contenido[0]);
        }
      });
  }

  showContent(content: Contenido): void {
    this.selectedContent = {
      ...content,
      Embed: this.sanitizer.bypassSecurityTrustHtml(content.Embed) as string,
    };
  }

  toggleUnit(index: number): void {
    this.visibleUnit[index] = !this.visibleUnit[index];
  }

  markContentSelection(buttonIndex: number): void {
    if (this.activeButton === buttonIndex) {
      this.activeButton = null;
    } else {
      this.activeButton = buttonIndex;
    }
  }
}
