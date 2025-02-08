import { Injectable } from '@angular/core';
import { Cursos } from '../models/curso.models'; 

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursos: Cursos[] = [ 
    { id: 1, 
      titulo: 'PROCESAMIENTO DE DATOS ', 
      modalidad: 'Virtual',
      certificacion: '',
      duracion: '',
      descripcion: '', 
      valor: 2700000 },
  ];

  constructor() {}

  getCursos(): Cursos[] {
    return this.cursos;
  }

  getCurso(id: number): Cursos | undefined {
    return this.cursos.find(curso => curso.id === id);
  }

  agregarCurso(curso: Cursos) {
    curso.id = this.cursos.length + 1;
    this.cursos.push(curso);
  }

  eliminarCurso(id: number) {
    this.cursos = this.cursos.filter(curso => curso.id !== id);
  }
}
