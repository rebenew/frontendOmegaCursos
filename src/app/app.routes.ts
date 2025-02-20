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
    path: 'grades',
    title: 'Grades',
    loadComponent: () =>
      import('./students-dashboard/grades/grades.component').then(
        (m) => m.GradesComponent
      ),
  },
  {
    path: 'home-student',
    title: 'Home - Student',
    loadComponent: () =>
      import('./students-dashboard/home-student/home-student.component').then(
        (m) => m.HomeStudentComponent
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
