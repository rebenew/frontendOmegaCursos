import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../interfaces/courses.interface';
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
  selectedModality: string = '';
  tags: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCourses();
    this.loadTags();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  loadCourses() {
    let params = new HttpParams();
  
    if (this.selectedModality?.trim()) {
      params = params.set('modality', this.selectedModality.trim());
    }
  
    const term = this.searchTerm?.trim();
      if (term) {
        params = params.set('title', term);
        params = params.append('tags', term);  
}

  
    this.http.get<Course[]>(environment.coursesUrl, { params }).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => console.error('Error cargando cursos:', err)
    });
  }
  
  searchCourses() {
    this.showFilters = false;
    this.loadCourses();
  }

  loadTags() {
    this.http.get<any[]>('http://localhost:8080/tags').subscribe(tags => {
      this.tags = tags.map(tag => tag.name);
    });
  }
  
}