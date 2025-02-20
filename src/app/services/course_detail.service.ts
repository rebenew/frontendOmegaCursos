import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseDetailService {
  private apiUrl = '/api/courses';
  constructor(private http: HttpClient) {}

  getCourseById(mentorId: number, courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${mentorId}/course/${courseId}`);
  }

  // getCourseById(courseId: number, mentorId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${courseId}?mentorId=${mentorId}`);
  // }
  

  // getCourseById(courseId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${courseId}`);
  // }
}