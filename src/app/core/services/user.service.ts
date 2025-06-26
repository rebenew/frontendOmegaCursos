import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/auth.model';

export interface UserCreateRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: 'admin' | 'student' | 'mentor';
  avatar?: string;
}

export interface UserUpdateRequest extends Partial<UserCreateRequest> {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);

  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.usersUrl}`).pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  // Obtener usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.usersUrl}/${id}`);
  }

  // Crear nuevo usuario
  createUser(userData: UserCreateRequest): Observable<User> {
    return this.http.post<User>(`${environment.usersUrl}`, userData).pipe(
      tap(newUser => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, newUser]);
      })
    );
  }

  // Actualizar usuario
  updateUser(userData: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(`${environment.usersUrl}/${userData.id}`, userData).pipe(
      tap(updatedUser => {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        );
        this.usersSubject.next(updatedUsers);
      })
    );
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.usersUrl}/${id}`).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.filter(user => user.id !== id);
        this.usersSubject.next(updatedUsers);
      })
    );
  }

  // Buscar usuarios
  searchUsers(term: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.usersUrl}/search?q=${term}`);
  }

  // Obtener usuarios por tipo
  getUsersByType(userType: 'admin' | 'student' | 'mentor'): Observable<User[]> {
    return this.http.get<User[]>(`${environment.usersUrl}/type/${userType}`);
  }

  // Actualizar perfil del usuario actual
  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.usersUrl}/profile`, userData);
  }

  // Cambiar contraseña
  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<void> {
    return this.http.put<void>(`${environment.usersUrl}/change-password`, passwordData);
  }

  // Cargar usuarios iniciales
  private loadUsers(): void {
    this.getUsers().subscribe();
  }
} 