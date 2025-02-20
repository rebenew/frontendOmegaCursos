import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CardComponent } from './Cards/card.component';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  courses: any[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.coursesService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        // console.log("Cursos cargados en Dashboard:", this.courses);
      },
      (error) => {
        console.error("Error cargando los cursos:", error);
      }
    );
  }
}
