import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CourseContent } from '../interfaces/course-content.interface';

@Injectable({ providedIn: 'root' })
export class CourseContentService {
  private dataUrl: string = 'data/course-content.json';

  constructor(private http: HttpClient) {}

  getCourseContent(): Observable<CourseContent[]> {
    return this.http.get<CourseContent[]>(this.dataUrl);
  }
}
