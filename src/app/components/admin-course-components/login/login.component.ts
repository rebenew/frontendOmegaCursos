import { Component } from '@angular/core';
import { AuthService } from '../../../services/admin-course-services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: []
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginAsAdmin() {
    this.authService.login('admin');
    console.log('Logged in as admin'); 
    this.router.navigate(['/dashboard']);
  }

  loginAsGuest() {
    this.authService.login('guest');
    console.log('Logged in as guest'); 
    this.router.navigate(['/dashboard']);
  }
}