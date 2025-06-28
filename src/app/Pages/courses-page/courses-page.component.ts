import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../interfaces/courses.interface';
import { CoursesResponse } from '../../interfaces/coursesResponse.interface';
import { environment } from '../../../environments/environment';

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
  showFilters: boolean = false;
  selectedCategory: string = '';
  selectedLevel: string = '';
  categories: string[] = [];
  levels: string[] = [];

  constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   // Cargar los cursos desde el archivo JSON
  //   this.http.get<CoursesResponse>('/assets/db.json').subscribe(response => {
  //     this.courses = response.courses;
  //   });
  // }

  // searchCourses(searchTerm: string) {
  //   this.http.get<CoursesResponse>('/assets/db.json').subscribe(response => {
  //     this.courses = response.courses.filter(course =>
  //       course.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });
  // }

  ngOnInit() {
    this.loadCourses();
    this.loadTags();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  loadCourses() {
    let params = new HttpParams();

    if (this.selectedCategory) {
      params = params.set('category', this.selectedCategory);
    }

    if (this.selectedLevel) {
      params = params.set('level', this.selectedLevel);
    }

    this.http.get<Course[]>(environment.coursesUrl, { params }).subscribe(courses => {
      this.courses = this.searchTerm
        ? courses.filter(course => course.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
        : courses;
    });
  }

  searchCourses() {
    this.showFilters = false;
    this.loadCourses();
  }

  loadTags() {
    this.http.get<any[]>('http://localhost:8080/tags').subscribe(tags => {
      this.categories = tags
        .map(tag => tag.name)
        .filter(name => !['Introductorio', 'Avanzado'].includes(name)); // Categorías = todos menos niveles

      this.levels = tags
        .map(tag => tag.name)
        .filter(name => ['Introductorio', 'Avanzado'].includes(name)); // Solo niveles
    });
  }
}