import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Unit, Resource } from '../../../models/admin-course-models/course-editor-model';
import { CdkDragDrop, moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditResourceDialogComponent } from '../modals/edit-resource-dialog/edit-resource-dialog.component';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  imports: [
    CdkDropList,
    CommonModule
  ],
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})
export class CourseEditorComponent implements OnInit {
  @ViewChild('unitsContainer', { static: false }) unitsContainer!: CdkDropList;

  course: Course | null = null;
  expandedUnits = new Set<number>(); 
  openMenuIndex: number | null = null;
  deletedUnits: Unit[] = [];
  private courseSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseEditorService: CourseEditorService,
    private dialog: MatDialog
  ) {}

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const courseId = params.get('id'); // Obtener ID del curso desde la URL
    if (courseId) {
      console.log(`📥 Cargando curso con ID: ${courseId}`);

      // Buscar el nombre real del curso en CourseService
      this.courseService.getCourseNameById(courseId).subscribe(courseName => {
        if (courseName) {
          console.log(`🔍 Nombre del curso encontrado: ${courseName}`);
          
          // Ahora cargar el curso correcto en CourseEditorService
          this.courseEditorService.loadCourseFromLocal(courseName);
        } else {
          console.warn(`⚠️ No se encontró un curso con ID ${courseId}`);
        }
      });
    }
  });

  // Suscribirse para obtener el curso actual
  this.courseEditorService.getCourse().subscribe(course => {
    this.course = course ? { ...course, content: course.content || [] } : null;
    console.log("🔹 Curso cargado en el editor:", this.course);
  });
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
    unit.contenido.splice(resourceIndex, 1);
    this.courseEditorService.saveCourseToLocal();
  }

  dropUnit(event: CdkDragDrop<Unit[]>): void {
    if (!this.course || event.previousIndex === event.currentIndex) return;

    if (event.container.id === 'delete-area') {
      console.warn("⚠️ No puedes soltar aquí.");
      return;
    }

    console.log("🔄 Moviendo unidad de", event.previousIndex, "a", event.currentIndex);
    moveItemInArray(this.course.content, event.previousIndex, event.currentIndex);
    this.courseEditorService.updateCourse({ ...this.course, content: [...this.course.content] });
  }
  
  deleteUnitOnDrop(event: CdkDragDrop<Unit[]>) {
    if (!this.course || event.previousIndex < 0 || event.container.id !== 'deleteContainer') return;

    const unitToDelete = this.course.content.splice(event.previousIndex, 1)[0];
    this.deletedUnits.push(unitToDelete);
    this.courseEditorService.saveCourseToLocal();
    console.log("🚮 Unidad eliminada:", unitToDelete);
  }
  
  openAddUnit(): void {
    if (!this.course) {
      console.warn("⚠️ No hay un curso cargado.");
      return;
    }

    const newUnit: Unit = {
      unidad: this.course.content.length + 1,
      contenido: []
    };
    this.courseEditorService.addUnit(newUnit);
  }

  restoreCourseFromJSON() {
    this.courseEditorService.loadCourseFromLocal(this.course?.course || '');
  }

  trackByIndex(index: number): number {
    return index;
  }
}