import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Course { 
  id: number;
  title: string;
  modality: 'Presencial' | 'Virtual';
  certification: string;
  duration: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private jsonUrl = 'assets/db.json';

  constructor(private http: HttpClient) {} 

  getCourses(): Observable<Course[]> {
    return this.http.get<{ courses: Course[] }>(this.jsonUrl).pipe(
      map(response => response.courses)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.getCourses().pipe(
      map(courses => courses.find(course => course.id === id)!)
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.jsonUrl}/${course.id}`, course);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.jsonUrl, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`);
  } 
}