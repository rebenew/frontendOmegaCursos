import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-student',
    title: 'Home - Student',
    loadComponent: () =>
      import('./students-dashboard/home-student/home-student.component').then(
        (m) => m.HomeStudentComponent
      ),
  },
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
  { path: '', redirectTo: '/home-student', pathMatch: 'full' },
];
