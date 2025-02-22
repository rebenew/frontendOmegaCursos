import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminCourseListComponent{
editCourse(arg0: number) {
throw new Error('Method not implemented.');
}
@Input() filteredCourses: Course[] = [];
  router: any;
  courses: any;

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
    this.courses = this.courses.filter((course: { id: number; }) => course.id !== id);
  }
}
}