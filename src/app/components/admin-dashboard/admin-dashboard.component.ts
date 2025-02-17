import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CourseService, Course } from '../../services/course-service/admin.course.services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,  
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  private subscription: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    @Inject(CourseService) public courseService: CourseService,
    private router: Router) {}

  ngOnInit() {
    this.subscription.add(
      this.courseService.getCourses().subscribe(
        courses => {
          this.courses = courses;
          console.log('Cursos cargados en el dashboard:', this.courses);
        },
        error => {
          this.errorMessage = 'Error al cargar los cursos';
          console.error('Error en el dashboard:', error);
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goToCourse(id: number) {
    this.router.navigate(['/courses/edit', id]);
  }
}








