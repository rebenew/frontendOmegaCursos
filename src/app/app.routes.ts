import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-course-components/admin-dashboard/admin-dashboard.component';
import { AdminCourseListComponent } from './components/admin-course-components/admin-course-list/admin-course-list.component';
import { AdminCourseFormComponent } from './components/admin-course-components/admin-course-form/admin-course-form.component';

export const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'courses', component: AdminCourseListComponent },
  { path: 'courses/new', component: AdminCourseFormComponent },
  { path: 'courses/edit/:id', component: AdminCourseFormComponent }, 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } 
];











