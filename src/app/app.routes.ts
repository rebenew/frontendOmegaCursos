import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminCursoListComponent } from './components/admin-curso-list/admin-curso-list.component';
import { AdminCursoFormComponent } from './components/admin-curso-form/admin-curso-form.component';
import { DashboardComponent } from './Dashboard_Mentor/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard_mentor', 
    component: DashboardComponent,
    children: [
      {
        path: '', 
        loadComponent: () => import('./Dashboard_Mentor/Courses_List/course-list.component').then(m => m.CourseListComponent)
      },
      {
        path: ':mentorId/course/:id',
        loadComponent: () => import('./Dashboard_Mentor/Courses_Detail/course-detail.component').then(m => m.CourseDetailComponent)
      }
    ]
  },
  // { path: 'dashboard', component: AdminDashboardComponent },
  // { path: 'cursos', component: AdminCursoListComponent },
  // { path: 'cursos/nuevo', component: AdminCursoFormComponent },
  // // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
