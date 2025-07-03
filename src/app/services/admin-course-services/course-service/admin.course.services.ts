import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Course { 
  id: number;
  title: string;
  modality: 'Presencial' | 'Virtual';
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
  private backendUrl = environment.coursesUrl;
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
    this.http.get<Course[]>(this.backendUrl)
      .pipe(
        tap(courses => this.coursesSubject.next(courses))
      )
      .subscribe({
        error: err => console.error('Error al cargar cursos', err)
      });
  }

  // Recargar cursos 
  public reloadCourses(): void {
    this.loadCourses();
  }

  // Establecer el término de búsqueda 
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term.toLowerCase());
  }

  // Obtener todos los cursos 
  getCourses(): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses ?? []) // Retorna los cursos almacenados
    );
  }

  // Obtener el nombre de un curso por su ID 
  getCourseNameById(courseId: string): Observable<string | null> {
    return this.getCourses().pipe(
      map(courses => {
        const course = courses.find(c => c.id.toString() === courseId);
        return course ? course.title : null;
      })
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
  return forkJoin({
    public: this.courses$.pipe(
      map(courses => courses?.find(course => course.title === title) || null)
    ),
    editable: this.http.get<editableCourse>(this.courseDetailsUrl).pipe(
      map(editableData => editableData.course === title ? editableData : null)
    )
  });
}

// Obtener los tags 
getTags(): Observable<Tag[]> {
  return this.http.get<Tag[]>(environment.tagsUrl);
}

//Agregar un curso 
addCourse(newCourse: Course): Observable<void> {
  return this.http.post<Course>(this.backendUrl, newCourse).pipe(
    tap(() => this.loadCourses()), 
    map(() => void 0)
  );
}

//Actualizar un curso 
updateCourse(updatedCourse: Course): Observable<void> {
  return this.http.put<Course>(`${this.backendUrl}/${updatedCourse.id}`, updatedCourse).pipe(
    tap(() => this.loadCourses()),
    map(() => void 0)
  );
}

//Borrar un curso 
deleteCourse(id: number): Observable<void> {
  return this.http.delete<void>(`${this.backendUrl}/${id}`).pipe(
    tap(() => {
      this.loadCourses();
    })
  );
}
}
