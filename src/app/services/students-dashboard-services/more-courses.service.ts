import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Courses } from '../../interfaces/students-dashboard-interfaces/more-courses.interface';

@Injectable({ providedIn: 'root' })
export class MoreCoursesService {
  private dataUrl: string = 'assets/students-dashboard-data/db.json';

  constructor(private http: HttpClient) {}

  // Get courses info from Data base.Json
  getMoreCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.dataUrl);
  }

  // Get course by ID
  getCourseById(id: string): Observable<Courses | undefined> {
    return this.http.get<Courses[]>(this.dataUrl).pipe(
      map((courses) => courses.find((course) => course.id === id)),
      catchError((error) => of(undefined))
    );
  }
}
