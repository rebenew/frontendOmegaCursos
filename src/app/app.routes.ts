import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminCourseListComponent } from './components/admin-course-list/admin-course-list.component';
import { AdminCourseFormComponent } from './components/admin-course-form/admin-course-form.component';

export const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'courses', component: AdminCourseListComponent },
  { path: 'courses/new', component: AdminCourseFormComponent },
  { path: 'courses/edit/:id', component: AdminCourseFormComponent }, // Ruta para editar cursos
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', redirectTo: 'courses', pathMatch: 'full' } // Ruta comodín
];
