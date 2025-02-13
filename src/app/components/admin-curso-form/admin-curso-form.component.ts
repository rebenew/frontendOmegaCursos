import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../services/admin.cursos.services';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-curso-form',
  templateUrl: './admin-curso-form.component.html',
  styleUrls: ['./admin-curso-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
}) 

export class AdminCursoFormComponent {
  cursoForm: FormGroup;
  /* Cambio la clase como FormGroup ya que se implementa mejor con el proyecto*/
  constructor(private fb: FormBuilder, private cursoService: CursoService) {
    this.cursoForm = this.fb.group({
      id: [0],
      titulo: ['', Validators.required], 
      modalidad: ['Presencial', Validators.required],
      certificacion: [false], 
      duracion: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      valor: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });
  }

  agregarCurso() {
    if (this.cursoForm.valid) {
      const formData = this.cursoForm.value;
      formData.certificacion = formData.certificacion ? 'Certificación virtual' : 'No certificable';
      this.cursoService.agregarCurso(formData);
      this.cursoForm.reset({
        id:0,
        titulo: '',
        modalidad: 'Presencial',
        certificacion: false,
        duracion: '',
        descripcion: '',
        valor: ''
      });
    }
  }
}

