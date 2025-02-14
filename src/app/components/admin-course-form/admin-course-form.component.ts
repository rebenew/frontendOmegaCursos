import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService, Course } from '../../services/course-service/admin.course.services';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-course-form',
  templateUrl: './admin-course-form.component.html',
  styleUrls: ['./admin-course-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
}) 
export class AdminCourseFormComponent implements OnInit {
  courseForm: FormGroup;
  courseId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      id: [0],
      title: ['', Validators.required], 
      modality: ['Presencial', Validators.required],
      certification: [false], 
      duration: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.courseId = +id;
        this.isEditMode = true;
        this.loadCourse(this.courseId);
      }
    });
  }

  loadCourse(id: number) {
    this.courseService.getCourseById(id).subscribe(
      course => {
        this.courseForm.patchValue(course);
      },
      error => {
        console.error('Error al cargar el curso:', error);
      }
    );
  }

  saveCourse() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      formData.certification = formData.certification ? 'Certificación virtual' : 'No certificable';

      if (this.isEditMode) {
        this.courseService.updateCourse(formData).subscribe(
          response => {
            console.log('Curso actualizado exitosamente:', response);
            this.router.navigate(['/courses']);
          },
          error => {
            console.error('Error al actualizar el curso:', error);
          }
        );
      } else {
        this.courseService.addCourse(formData).subscribe(
          response => {
            console.log('Curso agregado exitosamente:', response);
            this.courseForm.reset({
              id: 0,
              title: '',
              modality: 'Presencial',
              certification: false,
              duration: '',
              description: '',
              price: ''
            });
            this.router.navigate(['/courses']);
          },
          error => {
            console.error('Error al agregar el curso:', error);
          }
        );
      }
    }
  }
}

