import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-course-components/admin-dashboard/admin-dashboard.component';
import { HomeStudentComponent } from './students-dashboard/home-student/home-student.component';
import { CourseContentComponent } from './students-dashboard/course-content/course-content.component';
import { DashboardComponent } from './Dashboard_Mentor/dashboard.component';
import { VistaCursosComponent } from './vista-cursos/vista-cursos.component';
import { AdminLayoutComponent } from './components/admin-course-components/admin-layout/admin-layout.component';

import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CoursesPageComponent } from './Pages/courses-page/courses-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';

export const routes: Routes = [
  {
    path: 'vistacursos',
    component: VistaCursosComponent
  },
  //admin-dashboard
  {
    path: 'admin-dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/admin-course-components/admin-dashboard/admin-dashboard.component')
          .then(m => m.AdminDashboardComponent),
        // canActivate: [AuthGuard]
      },
      {
        path: 'courses',
        loadComponent: () => import('./components/admin-course-components/admin-course-list/admin-course-list.component')
          .then(m => m.AdminCourseListComponent),
        //canActivate: [AuthGuard]
      },
      {
        path: 'courses/new',
        loadComponent: () => import('./components/admin-course-components/admin-course-form/admin-course-form.component')
          .then(m => m.AdminCourseFormComponent),
        //canActivate: [AuthGuard]
      },
      {
        path: 'courses/edit/:id',
        loadComponent: () => import('./components/admin-course-components/admin-course-form/admin-course-form.component')
          .then(m => m.AdminCourseFormComponent),
        //canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadComponent: () => import('./components/admin-course-components/login/login.component')
          .then(m => m.LoginComponent)
      },

      // {
      //   path: '',
      //   component: VistaCursosComponent,
      // },
      // { path: 'dashboard', component: AdminDashboardComponent },
    ],
  },
  //Dashboard mentor
  { path: 'dashboard_mentor', component: DashboardComponent },
  //Home Student Component
  {
    path: 'home-student',
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
  { path: '', redirectTo: 'landing', pathMatch: 'full' }, // Redirige la raíz a la landing page
  { path: 'landing', component: LandingPageComponent },
  { path: 'login2', component: LoginPageComponent },
  { path: 'cursos', component: CoursesPageComponent },
  { path: 'signup', component: SignupPageComponent},

];










