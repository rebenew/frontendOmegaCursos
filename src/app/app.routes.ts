import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-course-components/admin-dashboard/admin-dashboard.component';
import { AdminCourseListComponent } from './components/admin-course-components/admin-course-list/admin-course-list.component';
import { AdminCourseFormComponent } from './components/admin-course-components/admin-course-form/admin-course-form.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./components/admin-course-components/admin-dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent)
  },
  {
    path: 'courses',
    loadComponent: () => import('./components/admin-course-components/admin-course-list/admin-course-list.component')
      .then(m => m.AdminCourseListComponent)
  },
  {
    path: 'courses/new',
    loadComponent: () => import('./components/admin-course-components/admin-course-form/admin-course-form.component')
      .then(m => m.AdminCourseFormComponent)
  },
  {
    path: 'courses/edit/:id',
    loadComponent: () => import('./components/admin-course-components/admin-course-form/admin-course-form.component')
      .then(m => m.AdminCourseFormComponent)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];











