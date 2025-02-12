import { Routes } from '@angular/router';
import { CoursesDetailsComponent } from './students-dashboard/courses-details/courses-details.component';

export const routes: Routes = [
  {
    path: 'more-courses',
    title: 'More Courses',
    loadComponent: () =>
      import('./students-dashboard/more-courses/more-courses.component').then(
        (m) => m.MoreCoursesComponent
      ),
  },
  {
    path: 'courses-details/:id',
    title: 'Courses details',
    loadComponent: () =>
      import(
        './students-dashboard/courses-details/courses-details.component'
      ).then((m) => m.CoursesDetailsComponent),
  },
  { path: '', redirectTo: '/more-courses', pathMatch: 'full' },
];
