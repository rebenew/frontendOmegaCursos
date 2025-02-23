import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/admin-course-services/auth-service/auth.service';
import { SearchBarComponent } from '../admin-search-bar/search-bar.component';
import { SearchService } from '../../../services/admin-course-services/search-service/search.service';
import { AdminCourseListComponent } from "../admin-course-list/admin-course-list.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,  
  imports: [CommonModule, RouterModule, SearchBarComponent, AdminCourseListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: any[] = [];
  private subscription: Subscription = new Subscription();
  errorMessage: string = '';
  mensajeBienvenida: string = '';
  isAdmin: boolean = false;
  isGridView = false;

  constructor(
    @Inject(CourseService) public courseService: CourseService,
    private router: Router, 
    private authService: AuthService,
    private searchService: SearchService
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
          this.filteredCourses= [...this.courses]
        },
        error: (error) => {
          this.errorMessage = `Error al cargar los cursos: ${error.message}`;
        }
      })
    );

    this.subscription.add(
      this.searchService.searchTerm$.subscribe(searchTerm => {
        this.filteredCourses = this.courses.filter(course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createNewCourse() {
    this.router.navigate(['admin-dashboard/courses/new']);
  }

  editCourseView(id: number) {
    console.log(`Editar información del curso con ID: ${id}`);
    this.router.navigate(['admin-dashboard/courses/edit', id]);
  }

  editCourseContent(id: number) {
    console.log(`Editar contenido del curso con ID: ${id}`);
    // this.router.navigate(['/admin/cursos/editar-contenido', id]);
  }

  deleteCourse(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      console.log(`Eliminar curso con ID: ${id}`);
      this.courses = this.courses.filter(course => course.id !== id);
    }
}
  onInput(searchTerm: string) {
  this.filteredCourses = this.courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
toggleView() {
  this.isGridView = !this.isGridView;
  console.log('isGridView cambiado a:', this.isGridView);
}

}
