import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CourseContentService } from '../../services/students-dashboard-services/course-content.service';

@Component({
  selector: 'course-content',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
})
export class CourseContentComponent implements OnInit {
  protected visible = false;

  constructor(private courseContentService: CourseContentService) {}

  ngOnInit(): void {}
}

// Show content

// Show Toggle
//   toggleCourse(course: CourseContent) {
//     course.isVisible = !course.isVisible;
//   }
// }
