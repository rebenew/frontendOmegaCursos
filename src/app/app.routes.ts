import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component.js';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { NgModule } from '@angular/core';
import { SearchUserDashboardComponent } from './search-user-dashboard/search-user-dashboard.component';

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
        component: SearchUserDashboardComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
