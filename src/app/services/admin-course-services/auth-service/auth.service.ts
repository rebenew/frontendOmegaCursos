import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// inject para inyectar dependecias manualmente, PLATFORM_ID para saber si estamos en el navegador o en el servidor
import { isPlatformBrowser } from '@angular/common';
// isPlatformBrowser permite verificar si el codigo se esta ejecutando en el navegador, se usa ya que localStorage no esta disponible en el servidor, solo en el navegador
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string = 'guest';
  
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  getRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem('role') ?? 'guest';
    }
    return this.role;
  }
  
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  login(role: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('role', role);
      this.role = role; 
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('role');
      this.role = 'guest';
      this.router.navigate(['/login']);
    }
  }

  getWelcomeMessage(): string {
    return 'Bienvenido, Administrador!';
  }
}
