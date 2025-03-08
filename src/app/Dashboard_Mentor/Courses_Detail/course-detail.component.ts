import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CourseDetailService } from '../../services/course_detail.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  courseDetail: any = {};
  modalOpen: boolean = false;
  modalOpenNotas: boolean = false;
  selectedStudent: any = null;

  constructor(
    private route: ActivatedRoute,
    private courseDetailService: CourseDetailService
  ) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        const mentorId = Number(params['mentorId']);
        const courseId = Number(params['id']);

        console.log(
          'este es el mentor id ',
          mentorId,
          ' y este es el curso id ',
          courseId
        );

        //   if (!isNaN(mentorId) && !isNaN(courseId)) {
        //     this.courseDetailService.getCourseById(mentorId, courseId).subscribe({
        //       next: data => {
        //         this.courseDetail = data;
        //       },
        //       error: error => {
        //         console.error("Error al obtener los detalles del curso:", error);
        //       }
        //     });
        //   }else {
        //     console.error("ID de curso o mentor no válido.");
        //   }
        fetch('assets/courses.json')
          .then((res) => res.json())
          .then((data) => {
            const mentor = data.find(
              (mentor: any) => mentor.mentorId === mentorId
            );
            console.log(mentor);

            if (mentor) {
              const curso = mentor.cursos.find(
                (curso: any) => curso.id === courseId
              );

              if (curso) {
                console.log('Curso encontrado:', curso);
                this.courseDetail = curso;
              } else {
                console.error('Curso no encontrado para el mentor');
              }
            } else {
              console.error('Mentor no encontrado');
            }
          });
      },
      error: (error) => {
        console.error('Error al obtener los parámetros de la ruta:', error);
      },
    });
  }

  openEditModal(estudiante: any) {
    this.selectedStudent = JSON.parse(JSON.stringify(estudiante)); // Clonamos el objeto para no modificar directamente
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedStudent = null;
  }

  saveChanges() {
    if (this.selectedStudent) {
      const index = this.courseDetail.estudiantes.findIndex(
        (e: any) => e.id === this.selectedStudent.id
      );
      if (index !== -1) {
        this.courseDetail.estudiantes[index] = { ...this.selectedStudent };
      }
      this.closeModal();
    }
  }

  openEditModalNotes(estudiante: any) {
    this.selectedStudent = JSON.parse(JSON.stringify(estudiante)); // Clonamos el objeto para no modificar directamente
    this.modalOpenNotas = true;
  }

  closeModalNotes() {
    this.modalOpenNotas = false;
  }
}
