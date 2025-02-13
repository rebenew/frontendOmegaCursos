import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminCursoListComponent } from './components/admin-curso-list/admin-curso-list.component';
import { AdminCursoFormComponent } from './components/admin-curso-form/admin-curso-form.component';

export const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'cursos', component: AdminCursoListComponent },
  { path: 'cursos/nuevo', component: AdminCursoFormComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
