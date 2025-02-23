import { Component, OnInit, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CourseDetailService } from '../../services/course_detail.service';


@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  
  courseDetail: any = null;
  modalOpen: boolean = false;
  selectedStudent: any = null;

  constructor (
    private route: ActivatedRoute,
    private courseDetailService: CourseDetailService
  ){}
  
  ngOnInit() {
    this.route.params.subscribe({
      next: params => {
        const mentorId = Number(params['mentorId']);
        const courseId = Number(params['id']);
      
        if (!isNaN(mentorId) && !isNaN(courseId)) {
          this.courseDetailService.getCourseById(mentorId, courseId).subscribe({
            next: data => {
              this.courseDetail = data;
            },
            error: error => {
              console.error("Error al obtener los detalles del curso:", error);
            }
          });
        }else {
          console.error("ID de curso o mentor no válido.");
        }
      },
      error: error => {
        console.error("Error al obtener los parámetros de la ruta:", error);
      }
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
      const index = this.courseDetail.estudiantes.findIndex((e: any) => e.id === this.selectedStudent.id);
      if (index !== -1) {
        this.courseDetail.estudiantes[index] = { ...this.selectedStudent };
      }
      this.closeModal();
    }
  }
}
