import { Routes } from '@angular/router';
import {AdminComponent} from "./admin-dashboard/admin-dashboard.component";
import {SearchUserDashboardComponent} from './search-user-dashboard/search-user-dashboard.component';
import { UserFormComponent } from "./admin-components/user-form/user-form.component";
import { UserDetailComponent } from "./admin-components/user-detail/user-detail.component";
import { EditUserComponent } from "./admin-components/edit-user/edit-user.component";

export const routes: Routes = [
  
  //Default path
  {
    path: '',
    data: { renderMode: 'client' },
    redirectTo: 'landing',
    pathMatch: 'full'
  }, // Redirige la raíz a la landing page
  

  //Admin User
  {path: 'admin',
        component: AdminComponent,        
    },

  {
    path: 'admin/user',
    component: SearchUserDashboardComponent,
  },

  {
    path: 'admin/adduser',
    component: UserFormComponent,
  },
  
  {
    path: 'admin/user-detail/:id',
    component: UserDetailComponent,
  },

  {
    path: 'admin/user-edit/:id',
    component: EditUserComponent,
  }

];
