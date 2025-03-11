import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DashboardHomeCourses } from "../../interfaces/students-dashboard-interfaces/dashboard-home.interface";

@Injectable({providedIn: 'root'})
export class DashboardHomeService {
  private url: string = "assets/students-dashboard-data/dashboard-home.json";
  constructor(private http: HttpClient) { }
  getDashboardHome(): Observable<DashboardHomeCourses[]> {
    return this.http.get<DashboardHomeCourses[]>(this.url);
  }
 }
