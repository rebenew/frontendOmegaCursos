import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService, Curso } from '../../services/admin.cursos.services';

@Component({
  selector: 'app-admin-curso-list',
  templateUrl: './admin-curso-list.component.html',
  styleUrls: ['./admin-curso-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminCursoListComponent {
  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) {
    this.cursos = this.cursoService.getCursos();
  }

  eliminarCurso(id: number) {
    this.cursoService.eliminarCurso(id);
    this.cursos = this.cursoService.getCursos();
  }
}