import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { CourseDetailService } from '../../services/course_detail.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})

export class CourseDetailComponent implements OnInit {
  mentorId: number = 0;

  NombreCurso: any;
  Completado: any;
  Estudiante: any;
  modalOpen: boolean = false;
  ModalOpenNotas: boolean = false;
  selectedStudent: any = null;


  constructor(
    private route: ActivatedRoute,
    private courseDetailService: CourseDetailService
  ) { }

 

ngOnInit() {
  combineLatest([
    this.route.parent?.params ?? this.route.params,
    this.route.params
  ]).subscribe(([parentParams, childParams]) => {
    this.mentorId = Number(parentParams['mentorId']);
    const courseId = Number(childParams['id']);

    if (!isNaN(courseId)) {
      this.courseDetailService.obtenerDetallesCurso(this.mentorId, courseId).subscribe({
        next: data => {
          const curso = data?.curso || data;
          this.NombreCurso = curso?.nombre || curso?.title;
          this.Completado = curso?.completado;
          this.Estudiante = curso?.estudiantes || curso?.students;
        },
        error: error => {
          console.error("Error al obtener los detalles del curso:", error);
        }
      });
    }
  });
}


  calcularNotaFinal(estudiante: any): number {
    const notas = estudiante.notas;
    if (!notas || notas.length === 0) return 0;

    let total = 0;
    let totalPorcentaje = 0;

    notas.forEach((nota: any) => {
      total += nota.calificacion * (nota.porcentaje / 100);
      totalPorcentaje += nota.porcentaje;
    });

    return totalPorcentaje > 0 ? total : 0;
  }

  toggleNotas(estudiante: any) {
    estudiante.verNotas = !estudiante.verNotas;
  }

  openEditModal(estudiante: any) {
    this.selectedStudent = JSON.parse(JSON.stringify(estudiante));
    this.modalOpen = true;
  }

  openNotasModal(estudiante: any) {
    this.selectedStudent = JSON.parse(JSON.stringify(estudiante));
    this.ModalOpenNotas = true;
  }

  openModal() {
    this.modalOpen = true;
    this.ModalOpenNotas = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.ModalOpenNotas = false;
    this.selectedStudent = null;
  }

  saveChanges() {
    if (this.selectedStudent) {
      const index = this.Estudiante.findIndex((e: any) => e.id === this.selectedStudent.id);
      if (index !== -1) {
        this.Estudiante[index] = { ...this.selectedStudent };
      }
      this.closeModal();
    }
  }
}