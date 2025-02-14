import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CourseService, Course } from '../../services/course-service/admin.course.services';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [CourseService],
})
export class AdminCourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  private subscription: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(public courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.subscription.add(
      this.courseService.getCourses().subscribe(
        courses => {
          this.courses = courses;
          console.log('Cursos cargados:', this.courses);
        },
        error => {
          this.errorMessage = 'Error al cargar los cursos';
          console.error('Error al cargar los cursos:', error);
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editCourse(id: number) {
    this.router.navigate(['/courses/edit', id]);
  }
}
