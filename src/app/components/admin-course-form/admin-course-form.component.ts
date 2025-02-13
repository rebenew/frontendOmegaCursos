import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course-service/admin.course.services';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-course-form',
  templateUrl: './admin-course-form.component.html',
  styleUrls: ['./admin-course-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
}) 
export class AdminCourseFormComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
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

  addCourse() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      formData.certification = formData.certification ? 'Certificación virtual' : 'No certificable';
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
        },
        error => {
          console.error('Error al agregar el curso:', error);
        }
      );
    }
  }
}

