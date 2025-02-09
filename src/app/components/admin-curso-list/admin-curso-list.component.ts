import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/admin.cursos.services';

@Component({
  selector: 'app-admin-curso-list',
  imports: [CommonModule],
  templateUrl: './admin-curso-list.component.html',
  styleUrl: './admin-curso-list.component.scss'
})
export class AdminCursoListComponent implements OnInit {
  cursos: any[] = [];
  constructor(private cursoService: CursoService) {}
  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
  }
  eliminarCurso(id: number) {
    this.cursoService.eliminarCurso(id);
    this.cursos = this.cursoService.getCursos(); 
  }

}