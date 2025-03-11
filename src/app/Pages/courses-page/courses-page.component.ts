import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../interfaces/courses.interface';
import { CoursesResponse } from '../../interfaces/coursesResponse.interface';


@Component({
  selector: 'app-courses-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  standalone: true
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Cargar los cursos desde el archivo JSON
    this.http.get<CoursesResponse>('/assets/db.json').subscribe(response => {
      this.courses = response.courses;
    });
  }

  searchCourses(searchTerm: string) {
    this.http.get<CoursesResponse>('/assets/db.json').subscribe(response => {
      this.courses = response.courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
}
