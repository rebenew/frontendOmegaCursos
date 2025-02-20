import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-course-components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {path: 'admin-dashboard', 
   component: AdminDashboardComponent,
   children: [
  {
   path: 'dashboard',
   loadComponent: () => import('./components/admin-course-components/admin-dashboard/admin-dashboard.component')
     .then(m => m.AdminDashboardComponent),
   canActivate: [AuthGuard] 
 },
 {
   path: 'courses',
   loadComponent: () => import('./components/admin-course-components/admin-course-list/admin-course-list.component')
     .then(m => m.AdminCourseListComponent),
   canActivate: [AuthGuard] 
 },
 {
   path: 'courses/new',
   loadComponent: () => import('./components/admin-course-components/admin-course-form/admin-course-form.component')
     .then(m => m.AdminCourseFormComponent),
   canActivate: [AuthGuard] 
 },
 {
   path: 'courses/edit/:id',
   loadComponent: () => import('./components/admin-course-components/admin-course-form/admin-course-form.component')
     .then(m => m.AdminCourseFormComponent),
   canActivate: [AuthGuard] 
 },
 {
   path: 'login',
   loadComponent: () => import('./components/admin-course-components/login/login.component')
     .then(m => m.LoginComponent)
 },
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: '**', redirectTo: 'login', pathMatch: 'full' }
   ]
  }
];










