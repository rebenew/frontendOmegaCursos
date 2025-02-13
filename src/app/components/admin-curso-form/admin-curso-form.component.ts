import { Component } from '@angular/core';
import { CursoService } from '../../services/admin.cursos.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-curso-form',
  templateUrl: './admin-curso-form.component.html',
  styleUrls: ['./admin-curso-form.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class AdminCursoFormComponent {
  nuevoCurso = {id: 0, titulo: '', modalidad: 'Presencial' as 'Presencial' | 'Virtual', certificacion: '', duracion: '', descripcion: '', valor: 0 };

  constructor(private cursoService: CursoService) {}

  agregarCurso() {
    this.cursoService.agregarCurso(this.nuevoCurso);
    this.nuevoCurso = {id: 0, titulo: '', modalidad: 'Virtual', certificacion: '', duracion: '', descripcion: '', valor: 0 };
  }
}

