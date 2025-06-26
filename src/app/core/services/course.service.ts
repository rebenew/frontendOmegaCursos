import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Course {
  id: number;
  title: string;
  imageUrl?: string;
  modality: 'Presencial' | 'Virtual';
  certification: string;
  duration: string;
  description: string;
  price: number;
  mentor_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CourseCreateRequest {
  title: string;
  imageUrl?: string;
  modality: 'Presencial' | 'Virtual';
  certification: string;
  duration: string;
  description: string;
  price: number;
  mentor_id?: number;
}

export interface CourseUpdateRequest extends Partial<CourseCreateRequest> {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  public courses$ = this.coursesSubject.asObservable();
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  // Obtener todos los cursos
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.coursesUrl}`).pipe(
      tap(courses => this.coursesSubject.next(courses))
    );
  }

  // Obtener curso por ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${environment.coursesUrl}/${id}`);
  }

  // Crear nuevo curso
  createCourse(courseData: CourseCreateRequest): Observable<Course> {
    return this.http.post<Course>(`${environment.coursesUrl}`, courseData).pipe(
      tap(newCourse => {
        const currentCourses = this.coursesSubject.value;
        this.coursesSubject.next([...currentCourses, newCourse]);
      })
    );
  }

  // Actualizar curso
  updateCourse(courseData: CourseUpdateRequest): Observable<Course> {
    return this.http.put<Course>(`${environment.coursesUrl}/${courseData.id}`, courseData).pipe(
      tap(updatedCourse => {
        const currentCourses = this.coursesSubject.value;
        const updatedCourses = currentCourses.map(course => 
          course.id === updatedCourse.id ? updatedCourse : course
        );
        this.coursesSubject.next(updatedCourses);
      })
    );
  }

  // Eliminar curso
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.coursesUrl}/${id}`).pipe(
      tap(() => {
        const currentCourses = this.coursesSubject.value;
        const updatedCourses = currentCourses.filter(course => course.id !== id);
        this.coursesSubject.next(updatedCourses);
      })
    );
  }

  // Buscar cursos
  searchCourses(term: string): Observable<Course[]> {
    this.searchTermSubject.next(term);
    return this.http.get<Course[]>(`${environment.coursesUrl}/search?q=${term}`);
  }

  // Obtener cursos por mentor
  getCoursesByMentor(mentorId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.coursesUrl}/mentor/${mentorId}`);
  }

  // Cargar cursos iniciales
  private loadCourses(): void {
    this.getCourses().subscribe();
  }

  // Obtener cursos filtrados localmente
  getFilteredCourses(): Observable<Course[]> {
    return this.courses$;
  }
} 