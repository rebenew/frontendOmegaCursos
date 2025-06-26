import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminCursoListComponent } from './Components/admin-curso-list/admin-curso-list.component';
import { AdminCursoFormComponent } from './Components/admin-curso-form/admin-curso-form.component';

import { HomeStudentComponent } from './students-dashboard/home-student/home-student.component';
import { DashboardComponent } from './Dashboard_Mentor/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CoursesPageComponent } from './Pages/courses-page/courses-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { MainLayoutComponent } from './Pages/main-layout/main-layout.component';

import { CourseContentComponent } from './students-dashboard/course-content/course-content.component';
import path from 'path';
import { UserCardComponent } from './admin-components/user-card/user-card.component';
import { UserDetailComponent } from './admin-components/user-detail/user-detail.component';
import { UserFormComponent } from './admin-components/user-form/user-form.component';
import { EditUserComponent } from './admin-components/edit-user/edit-user.component';
import { AdminComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  //RUTAS LANDING OK
  {
    path: '',
    data: { renderMode: 'client' },
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        data: { renderMode: 'client' },
        component: LandingPageComponent,
      },
      {
        path: 'login2',
        data: { renderMode: 'client' },
        component: LoginPageComponent,
      },
      {
        path: 'cursos',
        data: { renderMode: 'client' },
        component: CoursesPageComponent,
      },
      {
        path: 'signup',
        data: { renderMode: 'client' },
        component: SignupPageComponent,
      },
    ],
  },
  //admin-dashboard - Protegido para administradores
  {
    path: 'admin-dashboard',
    data: { renderMode: 'client', roles: ['admin'] },
    component: HomelayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        data: { renderMode: 'client' },
        redirectTo: 'courses',
        pathMatch: 'full',
      },
      {
        path: 'courses',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './Components/admin-course-components/admin-dashboard/admin-dashboard.component'
          ).then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'courses/new',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './Components/admin-course-components/admin-course-form/admin-course-form.component'
          ).then((m) => m.AdminCourseFormComponent),
      },
      {
        path: 'courses/edit-view/:id',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './Components/admin-course-components/admin-course-form/admin-course-form.component'
          ).then((m) => m.AdminCourseFormComponent),
      },
      {
        path: 'courses/edit-content/:id',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './Components/admin-course-components/admin-course-editor/course-editor.component'
          ).then((m) => m.CourseEditorComponent),
      },
    ],
  },
  {
    path: '',
    component: HomelayoutComponent,
    canActivate: [AuthGuard],
    children: [
      //Dashboard mentor - Protegido para mentores
      {
        path: 'dashboard_mentor',
        data: { renderMode: 'client', roles: ['mentor'] },
        component: DashboardComponent,
        canActivate: [RoleGuard],
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
      //Home Student Component - Protegido para estudiantes
      {
        path: 'home-student',
        data: { renderMode: 'client', roles: ['student'] },
        title: 'Home - Student',
        component: HomeStudentComponent,
        canActivate: [RoleGuard],
      },
      // More courses - Protegido para estudiantes
      {
        path: 'more-courses',
        data: { renderMode: 'client', roles: ['student'] },
        title: 'More Courses',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import(
            './students-dashboard/more-courses/more-courses.component'
          ).then((m) => m.MoreCoursesComponent),
      },
      //Course content - Protegido para estudiantes
      {
        path: 'course-content',
        data: { renderMode: 'client', roles: ['student'] },
        title: 'Content',
        component: CourseContentComponent,
        canActivate: [RoleGuard],
        children: [
          {
            path: 'content',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/content/content.component'
              ).then((m) => m.ContentComponent),
          },
          {
            path: 'learning-tools',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/learning-tools/learning-tools.component'
              ).then((m) => m.LearningToolsComponent),
          },
          {
            path: 'reviews',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/reviews/reviews.component'
              ).then((m) => m.ReviewsComponent),
          },
          {
            path: 'q&a',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/questions-answers/questions-answers.component'
              ).then((m) => m.QuestionsAnswersComponent),
          },
        ],
      },
      // Grades route - Protegido para estudiantes
      {
        path: 'grades',
        data: { renderMode: 'client', roles: ['student'] },
        title: 'Grades',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./students-dashboard/grades/grades.component').then(
            (m) => m.GradesComponent
          ),
      },
      // Community route - Protegido para estudiantes
      {
        path: 'community',
        data: { renderMode: 'client', roles: ['student'] },
        title: 'Community',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./students-dashboard/community/community.component').then(
            (m) => m.CommunityComponent
          ),
      },
    ],
  },

  // Default path
  {
    path: '',
    data: { renderMode: 'client' },
    redirectTo: 'landing',
    pathMatch: 'full',
  }, // Redirige la raíz a la landing page
  {
    path: 'landing',
    data: { renderMode: 'client' },
    component: LandingPageComponent,
  },
  {
    path: 'login2',
    data: { renderMode: 'client' },
    component: LoginPageComponent,
  },
  {
    path: 'cursos',
    data: { renderMode: 'client' },
    component: CoursesPageComponent,
  },
  {
    path: 'signup',
    data: { renderMode: 'client' },
    component: SignupPageComponent,
  },

  //Admin User - Protegido para administradores
  {
    path: '',
    component: HomelayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    children: [
        {
          path: 'admin',
          data: { renderMode: 'client' },
          component: AdminComponent,
        },
        {
          path: 'admin/user',
          data: { renderMode: 'client' },
          component: UserCardComponent,
        },

        {
          path: 'admin/adduser',
          data: { renderMode: 'client' },
          component: UserFormComponent,
        },

        {
          path: 'admin/user-detail/:id',
          data: { renderMode: 'client' },
          component: UserDetailComponent,
        },

        {
          path: 'admin/user-edit/:id',
          data: { renderMode: 'client' },
          component: EditUserComponent,
       },
    ],
  },
];
