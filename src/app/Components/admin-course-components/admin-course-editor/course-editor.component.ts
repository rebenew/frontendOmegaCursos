import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Unit, Resource } from '../../../models/admin-course-models/course-editor-model';
import { DragDropModule ,CdkDragDrop, moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditResourceDialogComponent } from '../modals/edit-resource-dialog/edit-resource-dialog.component';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';
import { ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  imports: [
    CdkDropList,
    CommonModule,
    DragDropModule
  ],
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})
export class CourseEditorComponent implements OnInit {
  @ViewChild('unitsContainer', { static: false }) unitsContainer!: CdkDropList;
  @ViewChildren('unitElement') unitElements!: QueryList<ElementRef>;

  course: Course | null = null;
  expandedUnits = new Set<number>(); 
  openMenuIndex: number | null = null;
  deletedUnits: Unit[] = [];
  private courseSubscription!: Subscription;
  undoStack: Course[] = [];
  highlightedUnitIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseEditorService: CourseEditorService,
    private dialog: MatDialog,
    private renderer: Renderer2, 
    private router: Router
  ) {}

 ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.courseService.getCourseNameById(courseId).subscribe(courseName => {
          if (courseName) {
            this.courseEditorService.loadCourseFromLocal(courseName);
          } else {
            console.warn(`⚠️ No se encontró un curso con ID ${courseId}`);
          }
        });
      }
    });

    this.courseEditorService.getCourse().subscribe(course => {
      if (course) {
        this.course = { ...course, content: [...(course.content || [])] };
        this.undoStack = []; // Limpiar la pila cuando se carga un nuevo curso
      }
    });
  }

   private saveState() {
    if (this.course) {
      this.undoStack.push(JSON.parse(JSON.stringify(this.course))); // Guardar copia profunda
    }
  }

   /** Deshacer el último cambio */
   undoLastChange() {
    if (this.undoStack.length === 0) return;

    const previousState = this.undoStack.pop();
    if (!previousState) return;

    // Identificar qué unidad se restauró (comparamos contenidos)
    const restoredUnitIndex = this.getRestoredUnitIndex(previousState);

    this.course = previousState;
    this.courseEditorService.updateCourse(this.course);

    if (restoredUnitIndex !== null) {
      this.highlightUnit(restoredUnitIndex);
    }

    console.log("↩️ Último cambio deshecho.");
  }

  private getRestoredUnitIndex(previousState: Course): number | null {
    if (!this.course) return null;

    for (let i = 0; i < this.course.content.length; i++) {
      if (JSON.stringify(this.course.content[i]) !== JSON.stringify(previousState.content[i])) {
        return i; // Devolvemos el primer índice que difiere
      }
    }

    return null;
  }

  ngOnDestroy() {
    this.courseSubscription?.unsubscribe();
  }

  toggleUnit(index: number) {
    this.expandedUnits.has(index) ? this.expandedUnits.delete(index) : this.expandedUnits.add(index);
  }

   toggleMenu(index: number) {
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }


  openEditModal(unit: Unit, resource?: Resource): void {
    const newResource: Resource = resource ? { ...resource } : { ResourceName: '', Link: '', Embed: '' };

    this.dialog.open(EditResourceDialogComponent, {
      width: '400px',
      data: { resource: newResource }
    }).afterClosed().subscribe(result => {
      if (result) {
        resource ? Object.assign(resource, result) : unit.contenido.push(result);
        this.courseEditorService.saveCourseToLocal();
      }
    });
  }

  dropResource(event: CdkDragDrop<Resource[]>, unitIndex: number) {
    if (!this.course) return;
    moveItemInArray(this.course.content[unitIndex].contenido, event.previousIndex, event.currentIndex);
    this.courseEditorService.saveCourseToLocal();
  }

  openDeleteDialog(unitIndex: number) {
    const unit = this.course?.content[unitIndex];
    if (!unit) return;

    this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { unitName: unit.unidad }
    }).afterClosed().subscribe(result => {
      if (result && this.course) {
        this.course.content.splice(unitIndex, 1);
        this.deletedUnits.push(unit);
        this.courseEditorService.saveCourseToLocal();
      }
    });
  }

 deleteResource(unit: Unit, resourceIndex: number): void {
    if (!this.course) return;

    this.saveState(); // Guardamos el estado antes de modificar

    unit.contenido.splice(resourceIndex, 1);
    this.courseEditorService.saveCourseToLocal();
  }

  dropUnit(event: CdkDragDrop<Unit[]>): void {
    if (!this.course || event.previousIndex === event.currentIndex) return;
  
    console.log("🔄 Moviendo unidad de", event.previousIndex, "a", event.currentIndex);
    const updatedContent = [...this.course.content];
    moveItemInArray(updatedContent, event.previousIndex, event.currentIndex);
  
    this.course = { ...this.course, content: updatedContent };
    this.courseEditorService.updateCourse(this.course);
  }
  
  deleteUnitOnDrop(event: CdkDragDrop<Unit[]>): void {
    if (!this.course || event.previousIndex < 0 || event.container.id !== 'deleteContainer') return;
  
    this.saveState();
  
    const unitToDelete = this.course.content.splice(event.previousIndex, 1)[0];
    this.deletedUnits = [...this.deletedUnits, unitToDelete]; // Clonar para detectar cambios
  
    this.course = { ...this.course, content: [...this.course.content] };
    this.courseEditorService.updateCourse(this.course);
    console.log("🚮 Unidad eliminada:", unitToDelete);
  }
  
   /** Modificaciones con guardado en la pila */
  openAddUnit(): void {
    if (!this.course) {
      console.warn("⚠️ No hay un curso cargado.");
      return;
    }
    
    this.saveState(); // Guardamos el estado antes de modificar
    
    const newUnit: Unit = {
      unidad: this.course.content.length + 1,
      contenido: []
    };
    this.courseEditorService.addUnit(newUnit);
  }

  restoreCourseFromJSON() {
    const courseName = this.course?.course || 'IA PARA TODOS'; // Asegurar el nombre correcto
    this.courseEditorService.loadEditableCourse(courseName); // Cargar desde JSON en lugar de LocalStorage
  }

  confirmRestoreCourse() {
    const confirmed = window.confirm("⚠️ ¿Estás seguro de que deseas restaurar el curso a su estado original? Esta acción no se puede deshacer.");
    if (confirmed) {
      this.restoreCourseFromJSON();
      console.log("🔄 Curso restaurado desde el JSON original.");
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
  private highlightUnit(index: number) {
    this.highlightedUnitIndex = index;
    setTimeout(() => {
      const unitElement = this.unitElements.get(index)?.nativeElement;
      if (unitElement) {
        unitElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Hacer scroll
        this.renderer.addClass(unitElement, 'highlight'); // Agregar clase CSS
        setTimeout(() => this.renderer.removeClass(unitElement, 'highlight'), 2000); // Quitar resaltado después de 2s
      }
    }, 100);
  }

  saveCourseAndExit() {
    if (!this.course) {
      console.warn("⚠️ No hay curso cargado para guardar.");
      return;
    }
  
    this.courseEditorService.saveCourseToLocal(); // Guardar curso
  
    this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: { message: "✅ El curso ha sido guardado correctamente." }
    }).afterClosed().subscribe(() => {
      console.log("✅ Curso guardado, redirigiendo...");
      this.router.navigate(['/admin-dashboard/courses']); // Redirigir a la página principal
    });
  }
}