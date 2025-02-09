import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component.js';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateUserDashboardComponent } from './create-user-dashboard/create-user-dashboard.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [    
    {
        path: '',
        component: AppComponent,        
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,        
    },
    {
        path: 'admin/user',
        component: CreateUserDashboardComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
