import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = '/api/mentors'; //uso la API en lugar de leer JSON directamente

  constructor(private http: HttpClient) {}

  getCoursesByMentor(mentorId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${mentorId}/courses`);
  }

  // getCourses(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
}
