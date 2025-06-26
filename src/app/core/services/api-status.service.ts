import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiStatus {
  status: 'online' | 'offline' | 'error';
  message: string;
  timestamp: Date;
  endpoints: {
    auth: boolean;
    courses: boolean;
    users: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiStatusService {

  constructor(private http: HttpClient) { }

  /**
   * Verifica el estado general de la API
   */
  checkApiStatus(): Observable<ApiStatus> {
    const status: ApiStatus = {
      status: 'offline',
      message: 'Verificando conexión...',
      timestamp: new Date(),
      endpoints: {
        auth: false,
        courses: false,
        users: false
      }
    };

    // Verificar endpoints principales usando forkJoin
    return forkJoin({
      auth: this.checkAuthEndpoint(),
      courses: this.checkCoursesEndpoint(),
      users: this.checkUsersEndpoint()
    }).pipe(
      map(results => {
        status.endpoints = results;
        const onlineEndpoints = Object.values(results).filter(Boolean).length;
        
        if (onlineEndpoints === 0) {
          status.status = 'offline';
          status.message = 'No se pudo conectar con el backend';
        } else if (onlineEndpoints === 3) {
          status.status = 'online';
          status.message = 'API funcionando correctamente';
        } else {
          status.status = 'error';
          status.message = `API parcialmente disponible (${onlineEndpoints}/3 endpoints)`;
        }
        
        return status;
      }),
      catchError(() => {
        status.status = 'offline';
        status.message = 'No se pudo conectar con el backend';
        return of(status);
      })
    );
  }

  /**
   * Verifica el endpoint de autenticación
   */
  private checkAuthEndpoint(): Observable<boolean> {
    return this.http.get(`${environment.authUrl}/health`, { 
      responseType: 'text',
      headers: { 'Accept': 'text/plain' }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Verifica el endpoint de cursos
   */
  private checkCoursesEndpoint(): Observable<boolean> {
    return this.http.get(`${environment.coursesUrl}`, { 
      responseType: 'text',
      headers: { 'Accept': 'application/json' }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Verifica el endpoint de usuarios
   */
  private checkUsersEndpoint(): Observable<boolean> {
    return this.http.get(`${environment.usersUrl}`, { 
      responseType: 'text',
      headers: { 'Accept': 'application/json' }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Verifica si la API está completamente funcional
   */
  isApiReady(): Observable<boolean> {
    return this.checkApiStatus().pipe(
      map(status => status.status === 'online')
    );
  }

  /**
   * Obtiene información detallada de los endpoints
   */
  getEndpointStatus(): Observable<{ [key: string]: boolean }> {
    return this.checkApiStatus().pipe(
      map(status => status.endpoints)
    );
  }
} 