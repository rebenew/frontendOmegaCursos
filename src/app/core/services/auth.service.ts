import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, LoginRequest, LoginResponse, RegisterRequest, AuthState } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('currentUser');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.authStateSubject.next({
          user,
          token,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        this.clearAuthData();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.setLoading(true);
    
    return this.http.post<LoginResponse>(`${environment.authUrl}/login`, credentials).pipe(
      tap(response => {
        this.setAuthData(response.user, response.token);
        this.setLoading(false);
      })
    );
  }

  register(userData: RegisterRequest): Observable<LoginResponse> {
    this.setLoading(true);
    
    return this.http.post<LoginResponse>(`${environment.authUrl}/register`, userData).pipe(
      tap(response => {
        this.setAuthData(response.user, response.token);
        this.setLoading(false);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    // Opcional: llamar al endpoint de logout del backend
    this.http.post(`${environment.authUrl}/logout`, {}).subscribe();
  }

  refreshToken(): Observable<{ token: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ token: string }>(`${environment.authUrl}/refresh`, { refreshToken });
  }

  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.user_type === 'admin';
  }

  isStudent(): boolean {
    const user = this.getCurrentUser();
    return user?.user_type === 'student';
  }

  isMentor(): boolean {
    const user = this.getCurrentUser();
    return user?.user_type === 'mentor';
  }

  private setAuthData(user: User, token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    this.authStateSubject.next({
      user,
      token,
      isAuthenticated: true,
      isLoading: false
    });
  }

  private clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('refreshToken');
    
    this.authStateSubject.next({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  }

  private setLoading(isLoading: boolean): void {
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({
      ...currentState,
      isLoading
    });
  }
} 