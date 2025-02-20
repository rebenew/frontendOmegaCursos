import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-course-components/admin-dashboard/admin-dashboard.component';
import { HomeStudentComponent } from './students-dashboard/home-student/home-student.component';
import { CourseContentComponent } from './students-dashboard/course-content/course-content.component';
import { DashboardComponent } from './Dashboard_Mentor/dashboard.component';
import { VistaCursosComponent } from './vista-cursos/vista-cursos.component';


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
 
 {
  path: '',
  component: VistaCursosComponent,
},

{ path: 'dashboard_mentor', component: DashboardComponent },
{ path: 'dashboard', component: AdminDashboardComponent },
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
{ path: '**', redirectTo: '', pathMatch: 'full' },

   ]
  }
];










