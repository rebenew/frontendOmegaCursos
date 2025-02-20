import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-course-form',
  templateUrl: './admin-course-form.component.html',
  styleUrls: ['./admin-course-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent]
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

/* To-do: 

-agregar menu desplegable para filtrar los cursos por modalidad, si son certificables o no, y por precio.
- agregar un botón para cancelar la edición y redirigir al listado de cursos.
- agregar validaciones personalizadas para el campo de duración. (?) 
- agregar un mensaje de confirmación antes de eliminar un curso.
- agregar un botón para eliminar un curso.
- agregar un mensaje de confirmación antes de guardar un curso.
- agregar un mensaje de error en el formulario.
- agregar un mensaje de éxito en el formulario.
- agregar tags para diferenciar los cursos.
- Quitar el checkbox y agregar una lista desplegable para la certificación.
- Idear la forma de separar los cursos de los bootcamps en la interfaz.
- Al hacer click en las tarjetas ver a detalle toda la información, incluir un punto de carga de archivos y editor de texto para editar la información interna de los cursos 
*/