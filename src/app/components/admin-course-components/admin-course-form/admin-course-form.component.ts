import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService, Tag } from '../../../services/admin-course-services/course-service/admin.course.services';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export enum CertificationType {
  Virtual = 'Certificación virtual',
  Presencial = 'Certificación presencial',
  None = 'No certificable'
}

@Component({
  selector: 'app-admin-course-form',
  templateUrl: './admin-course-form.component.html',
  styleUrls: ['./admin-course-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
}) 

export class AdminCourseFormComponent implements OnInit {
  @Output() courseUpdated = new EventEmitter<void>();
  courseForm!: FormGroup;
  isEditMode = false;
  courseId: number | null = null;
  showConfirmation = false;
  confirmationMessage = '';
  availableTags: Tag[] = [];
  CertificationType = CertificationType;
  certificationOptions = Object.values(CertificationType);

  
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadAvailableTags(); 
  
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
          const selectedTagIds = course.tags?.map(tag => tag.id) || [];
          this.courseForm.get('tags')?.setValue(selectedTagIds);
        }
      });
  }
  
// Cargar los tags desde el backend
loadAvailableTags() {
  this.courseService.getTags().subscribe(tags => {
    this.availableTags = tags;
  });
}
  

  private initializeForm() {
    this.courseForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      modality: ['PRESENCIAL', Validators.required],
      certification: ['No certificable', Validators.required],
      duration: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      tags: [[]] 
    });
  }
  
  // Cuando se marca o desmarca un tag
onTagChange(event: Event, tag: Tag) {
  const selectedTags = this.courseForm.get('tags')?.value || [];
  if ((event.target as HTMLInputElement).checked) {
    selectedTags.push(tag.id);
  } else {
    const index = selectedTags.indexOf(tag.id);
    if (index >= 0) selectedTags.splice(index, 1);
  }
  this.courseForm.get('tags')?.setValue(selectedTags);
}

// Para mantener checkbox marcado si ya estaba
isTagSelected(tag: Tag): boolean {
  return this.courseForm.get('tags')?.value?.includes(tag.id);
}

  saveCourse() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
  
      if (!this.isEditMode) {
        delete formData.id;
      }
  
      formData.price = Number(formData.price);
  
      formData.modality = formData.modality === 'Presencial' ? 'PRESENCIAL' : 'VIRTUAL';
  
      const courseOperation = this.isEditMode
        ? this.courseService.updateCourse(formData)
        : this.courseService.addCourse(formData);
  
      courseOperation.subscribe({
        next: () => {
          const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '400px',
            data: { message: this.isEditMode ? 'Curso actualizado correctamente' : 'Curso creado correctamente' }
          });
  
          // Cerrar el modal automáticamente después de 2 segundos
          setTimeout(() => {
            dialogRef.close();
          }, 2000);
  
          dialogRef.afterClosed().subscribe(() => {
            this.courseUpdated.emit();
            this.router.navigate(['/admin-dashboard/courses']);
          });
        },
        error: (err: any) => console.error(`Error al ${this.isEditMode ? 'actualizar' : 'agregar'} el curso:`, err)
      });
    }
  }

  showModal(message: string) {
    this.confirmationMessage = message;
    this.showConfirmation = true;

    setTimeout(() => {
      this.closeModal();
    }, 2000);
  }

  closeModal() {
    this.showConfirmation = false;
    this.router.navigate(['admin-dashboard/courses']);
  }

  cancel() {
    this.router.navigate(['admin-dashboard/courses']);
  }
  
}