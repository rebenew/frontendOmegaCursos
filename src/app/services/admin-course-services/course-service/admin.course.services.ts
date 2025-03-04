import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, forkJoin } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

export interface Course { 
  id: number;
  title: string;
  imageUrl?: string;
  modality: 'Presencial' | 'Virtual';
  certification: string;
  duration: string;
  description: string;
  price: number;
}
export interface editableCourse { 
  course: string;
  content: {
    unidad: number;
    contenido: {
      ResourceName: string;
      Link: string;
      Embed: string;
    }[];
  }[];
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  private coursesUrl = 'assets/db.json';
  private courseDetailsUrl = 'assets/resources_IA_para_todos.json';
  private coursesSubject = new BehaviorSubject<Course[] | null>(null);
  private searchTermSubject = new BehaviorSubject<string>('');

  courses$ = this.coursesSubject.asObservable();
  searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

   // Cargar cursos una sola vez y almacenarlos en BehaviorSubject
   private loadCourses(): void {
    this.http.get<{ courses: Course[] }>(this.coursesUrl)
      .pipe(
        map(data => data.courses),
        tap(courses => this.coursesSubject.next(courses)) 
      )
      .subscribe();
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term.toLowerCase());
  }

  // Obtener todos los cursos 
  getCourses(): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses ?? []) // Retorna los cursos almacenados
    );
  }

  // Obtener curso por ID desde la caché 
  getCourseById(id: number): Observable<Course | null> {
    return this.courses$.pipe(
      map(courses => courses?.find(course => course.id === id) || null)
    );
  }

// Obtener información publica + editable de un curso por su título 
getCourseByTitle(title: string): Observable<{ public: Course | null, editable: editableCourse | null }> {
  return this.http.get<editableCourse>(this.courseDetailsUrl).pipe(
    map(editableData => ({
      public: this.coursesSubject.getValue()?.find(course => course.title === title) || null,
      editable: editableData.course === title ? editableData : null
    }))
  );
}
addCourse(newCourse: Course): Observable<void> {
  return this.courses$.pipe(
    take(1),
    map(courses => courses ? [...courses, newCourse] : [newCourse]),
    tap(updatedCourses => this.coursesSubject.next(updatedCourses)),
    map(() => void 0)
  );
}

updateCourse(updatedCourse: Course): Observable<void> {
  return this.courses$.pipe(
    take(1),
    map(courses => courses ? courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course) : []),
    tap(updatedCourses => this.coursesSubject.next(updatedCourses)),
    map(() => void 0)
  );
}

  deleteCourse(id: number) {
    const currentCourses = this.coursesSubject.getValue();
    if (currentCourses) {
      const updatedCourses = currentCourses.filter(course => course.id !== id);
      this.coursesSubject.next(updatedCourses);
    }
  }
}
