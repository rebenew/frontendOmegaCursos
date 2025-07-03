import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseDetailService {
  private backendUrl = environment.coursesUrl;
  private Urlcursos = '/assets/courses.json';

  constructor(private http: HttpClient) {}

  obtenerDetallesCurso(mentorId: number, courseId: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/${courseId}`).pipe(
      // Si falla, fallback al mock
      // Puedes usar catchError de rxjs si quieres mantener compatibilidad
      // Si no quieres fallback, elimina el catchError
      // Ejemplo con fallback:
      // catchError(error => {
      //   console.error('Fallo backend, usando mock:', error);
      //   return this.http.get<any[]>(this.Urlcursos).pipe(
      //     map((cursos) => this.filtrarCursoPorMentorYIdCurso(cursos, mentorId, courseId))
      //   );
      // })
    );
  }

  private filtrarCursoPorMentorYIdCurso(cursos: any[], mentorId: number, courseId: number): any {
    const mentor = cursos.find((curso) => curso.id === mentorId);
    if (mentor) {
      const curso = mentor.cursos.find((curso: any) => curso.id === courseId);
      if (curso) {
        return { 
          curso
        }
      }
    }
    return null
  }
}
