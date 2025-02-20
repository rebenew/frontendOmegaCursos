import { Routes } from '@angular/router';
import { HomeStudentComponent } from './students-dashboard/home-student/home-student.component';
import { CourseContentComponent } from './students-dashboard/course-content/course-content.component';

export const routes: Routes = [
  // Default path
  {
    path: '',
    title: 'Home - Student',
    component: HomeStudentComponent,
  },

  // More courses
  {
    path: 'more-courses',
    title: 'More Courses',
    loadComponent: () =>
      import('./students-dashboard/more-courses/more-courses.component').then(
        (m) => m.MoreCoursesComponent
      ),
  },

  //More course details
  {
    path: 'courses-details/:id',
    title: 'Courses details',
    loadComponent: () =>
      import(
        './students-dashboard/more-courses/courses-details/courses-details.component'
      ).then((m) => m.CoursesDetailsComponent),
  },

  //Course content
  {
    path: 'course-content/:id',
    title: 'Content',
    component: CourseContentComponent,
    children: [
      {
        path: 'content',
        loadComponent: () =>
          import(
            './students-dashboard/course-content/content/content.component'
          ).then((m) => m.ContentComponent),
      },
      {
        path: 'learning-tools',
        loadComponent: () =>
          import(
            './students-dashboard/course-content/learning-tools/learning-tools.component'
          ).then((m) => m.LearningToolsComponent),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import(
            './students-dashboard/course-content/reviews/reviews.component'
          ).then((m) => m.ReviewsComponent),
      },
      {
        path: 'q&a',
        loadComponent: () =>
          import(
            './students-dashboard/course-content/questions-answers/questions-answers.component'
          ).then((m) => m.QuestionsAnswersComponent),
      },
    ],
  },

  //Default path
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
