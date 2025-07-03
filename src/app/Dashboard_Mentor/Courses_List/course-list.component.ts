import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CourseInterface } from '../../interfaces/user.interface';
import { CoursesService } from '../../services/courses.service';
import { CardComponent } from '../Cards/card.component';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-course-list',
    standalone: true, // ← Agregar esta línea
    imports: [NgFor, CardComponent],
    templateUrl: './course-list.component.html',
    styleUrl: './course-list.component.scss',
  })
  
  
  export class CourseListComponent implements OnInit {
    courses: CourseInterface[] = [];
    mentorId: number = 0;
    mentor: any;
  
    constructor(private coursesService: CoursesService,
      private route: ActivatedRoute) { }
  
    ngOnInit() {
      this.route.params.subscribe({
        next: (params) => {
          this.mentorId = Number(params['id']);
          console.log('mentorId:', this.mentorId);
          this.coursesService.obtenerMentorConCursos(this.mentorId).subscribe({
            next: (data) => {
              console.log('Datos recibidos:', data);
              this.courses = data?.cursos || [];
              this.mentor = data?.nombre || '';
            },
            error: (error) => {
              console.error("Error cargando los cursos del mentor:", error);
            }
          });
        },
        error: (error) => {
          console.error("Error al obtener los parámetros de la ruta:", error);
        }
      });
    }
  }


