import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardCourses } from '../../interfaces/students-dashboard-interfaces/dashboard-courses.interface';

@Injectable({ providedIn: 'root' })
export class StudentsDashboard {
  private dataUrl: string =
    'assets/students-dashboard-data/dashboard-courses.json';

  constructor(private http: HttpClient) {}

  getDashboardCourses(): Observable<DashboardCourses[]> {
    return this.http.get<DashboardCourses[]>(this.dataUrl);
  }
}
