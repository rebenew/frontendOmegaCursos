import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AdminCourseListComponent {
  @Input() filteredCourses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(private router: Router) {}

  editCourseView(id: number) {
    console.log(`Editar información del curso con ID: ${id}`);
    this.router.navigate(['admin-dashboard/courses/edit-view', id]);
  }

  editCourseContent(id: number) {
    console.log(`Editar contenido del curso con ID: ${id}`);
    this.router.navigate(['admin-dashboard/courses/edit-content', id]);
  }

  deleteCourse(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      this.filteredCourses = this.filteredCourses.filter(course => course.id !== id);
      console.log(`Curso con ID ${id} eliminado.`);
    }
  }
  showDetails(course: Course) {
    this.selectedCourse = course;
  }

}
