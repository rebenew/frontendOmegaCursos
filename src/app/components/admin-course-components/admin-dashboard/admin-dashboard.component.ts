import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/admin-course-services/auth-service/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,  
  imports: [CommonModule, SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  private subscription: Subscription = new Subscription();
  errorMessage: string = '';
  mensajeBienvenida: string = '';
  isAdmin: boolean = false;

  constructor(
    @Inject(CourseService) public courseService: CourseService,
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.mensajeBienvenida = this.authService.getWelcomeMessage();
    }

    this.subscription.add(
      this.courseService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
        },
        error: (error) => {
          this.errorMessage = `Error al cargar los cursos: ${error.message}`;
        }
      })
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







