import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-course-form',
  templateUrl: './admin-course-form.component.html',
  styleUrls: ['./admin-course-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
}) 
export class AdminCourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;
  courseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.courseId = +id;
            return this.courseService.getCourseById(this.courseId);
          }
          return of(null);
        })
      )
      .subscribe(course => {
        if (course) {
          this.courseForm.patchValue(course);
        }
      });
  }

  private initializeForm() {
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
  
  saveCourse() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      formData.certification = formData.certification ? 'Certificación virtual' : 'No certificable';
  
      const courseOperation = this.isEditMode
        ? this.courseService.updateCourse(formData) 
        : this.courseService.addCourse({ ...formData, id: Date.now() }); // Asignamos un ID único temporal
  
      courseOperation.subscribe({
        next: () => {
          console.log(`Curso ${this.isEditMode ? 'actualizado' : 'agregado'} exitosamente`);
          this.router.navigate(['/courses']);
        },
        error: (err: any) => console.error(`Error al ${this.isEditMode ? 'actualizar' : 'agregar'} el curso:`, err)
      });
    }
  }

  loadCourse(id: number) {
    this.courseService.getCourseById(id).subscribe(
      course => {
        if (course) {
          this.courseForm.patchValue(course);
        }
      },
      error => {
        console.error('Error al cargar el curso:', error);
      }
    );
  }
}


  

/* To-do: 

-agregar menu desplegable para filtrar los cursos por modalidad, si son certificables o no, y por precio.
- agregar un botón para cancelar la edición y redirigir al listado de cursos.
- agregar validaciones personalizadas para el campo de duración. (?) 
- agregar un mensaje de confirmación antes de guardar un curso.
- agregar un mensaje de error en el formulario.
- agregar un mensaje de éxito en el formulario.
- agregar tags para diferenciar los cursos.
- Quitar el checkbox y agregar una lista desplegable para la certificación.
- Idear la forma de separar los cursos de los bootcamps en la interfaz.
- Al hacer click en las tarjetas ver a detalle toda la información, incluir un punto de carga de archivos y editor de texto para editar la información interna de los cursos 
*/