import { Injectable } from '@angular/core';
import { Course, Unit, Resource } from '../../../models/admin-course-models/course-editor-model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseEditorService {
  private courseInfo = 'assets/resources_IA_para_todos.json';
  private course: Course | null = null;

  constructor(private http: HttpClient) {
    this.loadCourse(); 
  }

  // Obtener curso desde el JSON
  getCourse(): Observable<Course> {
    return this.http.get<Course>(this.courseInfo).pipe(
      map(data => ({
        course: data.course,
        content: data.content.map((unit: any) => ({
          unidad: unit.unidad,
          contenido: unit.contenido.map((res: any) => ({
            ResourceName: res.ResourceName,
            Link: res.Link,
            Embed: res.Embed
          }))
        }))
      }))
    );
  }

  // Obtener todas las unidades de un curso específico
  getCourseContent(courseTitle: string): Observable<Unit[]> {
    return this.http.get<{ course: string, content: Unit[] }>(this.courseInfo).pipe(
      map(data => (data.course === courseTitle ? data.content : []))
    );
  }

  // Agregar una nueva unidad al curso
  addUnit(title: string) {
    if (this.course) {
      const newUnit: Unit = {
        unidad: this.course.content.length + 1,
        contenido: []
      };
      this.course.content.push(newUnit);
      this.saveCourse();
    }
  }

  // Agregar un nuevo recurso a una unidad específica
  addResource(unitIndex: number, resourceName: string, link: string, embed: string) {
    if (this.course && this.course.content[unitIndex]) {
      const newResource: Resource = {
        ResourceName: resourceName,
        Link: link,
        Embed: embed
      };
      this.course.content[unitIndex].contenido.push(newResource);
      this.saveCourse();
    }
  }

  // Eliminar una unidad
  removeUnit(unitIndex: number) {
    if (this.course && this.course.content[unitIndex]) {
      this.course.content.splice(unitIndex, 1);
      this.reorderUnits();
      this.saveCourse();
    }
  }

  // Eliminar un recurso de una unidad
  removeResource(unitIndex: number, resourceIndex: number) {
    if (this.course && this.course.content[unitIndex]) {
      this.course.content[unitIndex].contenido.splice(resourceIndex, 1);
      this.saveCourse();
    }
  }

  // Reordena los números de las unidades después de eliminar una
  private reorderUnits() {
    if (this.course) {
      this.course.content.forEach((unit, index) => {
        unit.unidad = index + 1;
      });
    }
  }

  // Cargar datos desde `localStorage`
  private loadCourse() {
    const data = localStorage.getItem('course');
    this.course = data ? JSON.parse(data) : null;
  }

  // Guardar cambios en `localStorage`
   saveCourse() {
    if (this.course) {
      localStorage.setItem('course', JSON.stringify(this.course));
    }
  }
}
