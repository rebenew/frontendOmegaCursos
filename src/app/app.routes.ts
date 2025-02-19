import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' }, // Redirige la raíz a la landing page
  { path: 'landing', component: LandingPageComponent }
];
