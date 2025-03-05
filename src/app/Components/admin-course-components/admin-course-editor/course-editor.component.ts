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
  expandedUnits: { [key: number]: boolean } = {};
  openMenuIndex: number | null = null;
  newUnitName = '';
  deletedUnits: Unit[] = [];
  private courseSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseEditorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.courseSubscription = this.courseService.getCourse().subscribe(course => {
      this.course = course ? { ...course, content: course.content || [] } : null;
      console.log("🔹 Curso cargado:", this.course);
    });
  }

  ngOnDestroy() {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

   toggleUnit(index: number) {
    this.expandedUnits[index] = !this.expandedUnits[index];
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
        if (!resource) {
          unit.contenido.push(result);
        } else {
          Object.assign(resource, result);
        }
        this.courseService.saveCourseToLocal();
      }
    });
  }

  dropResource(event: CdkDragDrop<Resource[]>, unitIndex: number) {
    if (this.course) {
      moveItemInArray(this.course.content[unitIndex].contenido, event.previousIndex, event.currentIndex);
      this.courseService.saveCourseToLocal();
    }
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
        this.courseService.saveCourseToLocal();
      }
    });
  }

  deleteResource(unit: Unit, resourceIndex: number): void {
    if (!this.course) return;
    unit.contenido.splice(resourceIndex, 1);
    this.courseService.saveCourseToLocal();
  }

  dropUnit(event: CdkDragDrop<Unit[]>): void {
    if (!this.course) return;
    if (event.container.id === 'delete-area') {
      console.warn("⚠️ No puedes soltar aquí.");
      return;
    }

    console.log("🔄 Moviendo unidad de", event.previousIndex, "a", event.currentIndex);
    moveItemInArray(this.course.content, event.previousIndex, event.currentIndex);
    this.courseService.updateCourse({ ...this.course, content: [...this.course.content] });
  }
  
  deleteUnitOnDrop(event: CdkDragDrop<Unit[]>) {
    if (!this.course || event.previousIndex < 0) return;
    if (event.container.id !== 'deleteContainer') return;

    const unitToDelete = this.course.content.splice(event.previousIndex, 1)[0];
    this.deletedUnits.push(unitToDelete);
    this.courseService.saveCourseToLocal();
    console.log("🚮 Unidad eliminada:", unitToDelete);
  }
  
  openAddUnit(): void {
    if (this.course) {
      const newUnit: Unit = {
        unidad: this.course.content.length + 1,
        contenido: []
      };
      this.courseService.addUnit(newUnit);
    } else {
      console.warn("⚠️ No hay un curso cargado.");
    }
  }


  closeDialog() {
    this.dialog.closeAll();
  }

  restoreCourseFromJSON() {
    this.courseSubscription = this.courseService.getCourse().subscribe(course => {
      this.course = course ? { ...course } : null;
    });
  }

  trackByIndex(index: number, item: any) {
    return item.id;
  }
}