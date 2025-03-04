import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Course, Unit } from '../../../models/admin-course-models/course-editor-model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { editableCourse } from '../course-service/admin.course.services';

@Injectable({
  providedIn: 'root'
})
export class CourseEditorService {
  editingUnitIndex: number | null = null;  
  private courseInfo = 'assets/resources_IA_para_todos.json';
  private courseSubject = new BehaviorSubject<Course>({ course: '', content: [] });

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

  // Obtener curso observable
  getCourse(): Observable<Course> {
    return this.courseSubject.asObservable();
  }
  

 // Agregar unidad y actualizar lista
 addUnit(newUnit: Unit): void {
  console.log("🟢 Agregando unidad:", newUnit);

  const currentCourse = this.courseSubject.value;
  if (!currentCourse) return;

  const updatedContent = [...currentCourse.content, newUnit];

  // Recalcular números de unidad
  updatedContent.forEach((unit, index) => unit.unidad = index + 1);

  this.courseSubject.next({ ...currentCourse, content: updatedContent });
  console.log("✅ Unidad agregada correctamente");
}

 // Mover unidad de posición
 moveUnit(previousIndex: number, newIndex: number): void {
  const currentCourse = this.courseSubject.value;
  if (!currentCourse || previousIndex === newIndex) return;

  console.log(`🔄 Moviendo unidad de ${previousIndex} a ${newIndex}`);

  const updatedContent = [...currentCourse.content];
  const [movedUnit] = updatedContent.splice(previousIndex, 1);
  updatedContent.splice(newIndex, 0, movedUnit);

  // Recalcular números de unidad
  updatedContent.forEach((unit, index) => unit.unidad = index + 1);

  this.courseSubject.next({ ...currentCourse, content: updatedContent });
  console.log("✅ Unidades reordenadas correctamente");
}

// Eliminar unidad
removeUnit(unitIndex: number): void {
  console.log("🗑️ Eliminando unidad en índice:", unitIndex);

  const currentCourse = this.courseSubject.value;
  if (!currentCourse || unitIndex < 0 || unitIndex >= currentCourse.content.length) return;

  const updatedContent = currentCourse.content.filter((_, index) => index !== unitIndex);

  // Recalcular números de unidad
  updatedContent.forEach((unit, index) => unit.unidad = index + 1);

  this.courseSubject.next({ ...currentCourse, content: updatedContent });
  console.log("✅ Unidad eliminada y lista reordenada");
}

  // Agregar recurso a una unidad
  addResource(unitIndex: number, resourceName: string, link: string, embed: string) {
    const currentCourse = this.courseSubject.value;
    if (!currentCourse || !currentCourse.content[unitIndex]) return;

    const updatedContent = [...currentCourse.content];
    updatedContent[unitIndex].contenido.push({ ResourceName: resourceName, Link: link, Embed: embed });

    this.courseSubject.next({ ...currentCourse, content: updatedContent });
    console.log("✅ Recurso agregado correctamente");
  }
   // Eliminar recurso de una unidad
   removeResource(unitIndex: number, resourceIndex: number) {
    const currentCourse = this.courseSubject.value;
    if (!currentCourse || !currentCourse.content[unitIndex]) return;

    const updatedContent = [...currentCourse.content];
    updatedContent[unitIndex].contenido = updatedContent[unitIndex].contenido.filter((_, i) => i !== resourceIndex);

    this.courseSubject.next({ ...currentCourse, content: updatedContent });
    console.log("✅ Recurso eliminado correctamente");
  }

  // Guardar curso en LocalStorage
  saveCourseToLocal(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentCourse = this.courseSubject.value;
      if (currentCourse.course) {  // Solo guardar si hay un curso seleccionado
        localStorage.setItem(`editableCourse_${currentCourse.course}`, JSON.stringify(currentCourse));
        console.log(`💾 Curso "${currentCourse.course}" guardado en LocalStorage`);
      }
    }
  }

  // Cargar curso desde LocalStorage
  loadCourseFromLocal(courseId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCourse = localStorage.getItem(`editableCourse_${courseId}`);
      if (storedCourse) {
        const course = JSON.parse(storedCourse);
        this.courseSubject.next(course);
        console.log(`✅ Curso "${courseId}" cargado desde LocalStorage`);
      } else {
        console.log(`⚠️ No hay datos guardados para "${courseId}", cargando desde JSON.`);
        this.loadEditableCourse(courseId);
      }
    }
  }
   // Cargar curso editable desde JSON
   loadEditableCourse(title: string): void {
    this.http.get<editableCourse>('assets/resources_IA_para_todos.json').subscribe({
      next: (editableData) => {
        console.log("🔍 JSON cargado:", editableData);
  
        if (!editableData || editableData.course !== title) {
          console.warn(`⚠️ No se encontró información para el curso "${title}", creando curso vacío.`);
          this.courseSubject.next({ course: title, content: [] });
        } else {
          this.courseSubject.next(editableData);
        }
  
        console.log("✅ Estado final de courseSubject:", this.courseSubject.value);
      },
      error: (err) => {
        console.error("❌ Error al cargar el JSON:", err);
      }
    });
  }
  
  
  
   // Actualizar curso
   updateCourse(updatedCourse: Course): void {
    this.courseSubject.next(updatedCourse);
    console.log("✅ Curso actualizado en CourseEditorService");
  }

}