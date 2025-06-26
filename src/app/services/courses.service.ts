import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  modality: 'PRESENCIAL' | 'VIRTUAL';
  certification: string;
  duration: string;
  description: string;
  price: number;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Mentor {
  id: number;
  nombre: string;
  correo: string;
  cursos: Course[];
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:8080';
  private Urlcursos = '/assets/courses.json'; // Fallback para datos mock

  constructor(private http: HttpClient) {}

  // Obtener todos los cursos desde el backend
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`).pipe(
      catchError(error => {
        console.error('Error al obtener cursos del backend:', error);
        // Fallback a datos mock si el backend no está disponible
        return this.http.get<any[]>(this.Urlcursos).pipe(
          map(courses => this.convertMockToCourseFormat(courses))
        );
      })
    );
  }

  // Obtener un curso específico por ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener curso ${id}:`, error);
        throw error;
      })
    );
  }

  // Crear un nuevo curso (requiere ADMIN)
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, course).pipe(
      catchError(error => {
        console.error('Error al crear curso:', error);
        throw error;
      })
    );
  }

  // Actualizar un curso (requiere ADMIN)
  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course).pipe(
      catchError(error => {
        console.error(`Error al actualizar curso ${id}:`, error);
        throw error;
      })
    );
  }

  // Eliminar un curso (requiere ADMIN)
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`).pipe(
      catchError(error => {
        console.error(`Error al eliminar curso ${id}:`, error);
        throw error;
      })
    );
  }

  // Método original para obtener mentor con cursos (mantenido para compatibilidad)
  obtenerMentorConCursos(mentorId: number): Observable<any> {
    return this.http.get<any[]>(this.Urlcursos).pipe(
      map((cursos) => this.filtrarCursosPorMentor(cursos, mentorId))
    );
  }

  private filtrarCursosPorMentor(cursos: any[], mentorId: number): any {
    const mentor = cursos.find((mentor) => mentor.id === mentorId);
    if (mentor) {
      return {
        id: mentor.id,
        nombre: mentor.nombre,
        correo: mentor.correo,
        cursos: mentor.cursos
      };
    }
    return null;
  }

  // Convertir datos mock al formato del backend
  private convertMockToCourseFormat(mockData: any[]): Course[] {
    return mockData.flatMap(mentor => 
      mentor.cursos?.map((curso: any) => ({
        id: curso.id,
        title: curso.titulo || curso.title,
        modality: curso.modalidad || 'VIRTUAL',
        certification: curso.certificacion || 'Certificado',
        duration: curso.duracion || '40 horas',
        description: curso.descripcion || curso.description,
        price: curso.precio || curso.price,
        tags: curso.tags || []
      })) || []
    );
  }

  // Verificar conexión con el backend
  testBackendConnection(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/courses`).pipe(
      map(() => true),
      catchError(() => {
        console.warn('Backend no disponible, usando datos mock');
        return throwError(() => new Error('Backend no disponible'));
      })
    );
  }
}
