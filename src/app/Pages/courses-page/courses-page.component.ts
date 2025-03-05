import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses-page',
  imports: [],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss'
})
export class CoursesPageComponent implements OnInit {
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Cargar los cursos desde el archivo JSON
    this.http.get<any[]>('/assets/db.json').subscribe(data => {
      this.courses = data;
    });
  }
}
