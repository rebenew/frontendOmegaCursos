import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Courses } from '../../interfaces/students-dashboard-interfaces/more-courses.interface';
import { RouterLink } from '@angular/router';
import { MoreCoursesService } from '../../services/students-dashboard-services/more-courses.service';

@Component({
  selector: 'more-courses',
  imports: [CommonModule, RouterLink],
  templateUrl: './more-courses.component.html',
  styleUrl: './more-courses.component.scss',
})
export class MoreCoursesComponent implements OnInit {
  public moreCourses: Courses[] = [];

  constructor(private moreCoursesService: MoreCoursesService) {}

  ngOnInit(): void {
    this.moreCoursesService
      .getMoreCourses()
      .subscribe((data) => (this.moreCourses = data));
  }
}
