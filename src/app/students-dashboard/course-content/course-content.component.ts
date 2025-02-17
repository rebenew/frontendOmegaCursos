import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseContent } from '../../interfaces/students-dashboard-interfaces/course-content.interface';
import { CourseContentService } from '../../services/students-dashboard-services/course-content.service';

@Component({
  selector: 'course-content',
  imports: [CommonModule, RouterModule],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
})
export class CourseContentComponent implements OnInit {
  public courseContent: CourseContent[] = [];

  constructor(private courseContentService: CourseContentService) {}

  ngOnInit(): void {
    this.courseContentService.getCourseContent().subscribe((data) => {
      this.courseContent = data;
    });
  }
}
