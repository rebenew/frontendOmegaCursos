import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' }, // Redirige la raíz a la landing page
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent }

];
