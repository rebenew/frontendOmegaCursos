import { Component, OnInit } from '@angular/core';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Unit, Resource } from '../../../models/admin-course-models/course-editor-model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditResourceDialogComponent } from '../edit-resource-dialog/edit-resource-dialog.component';
import { AddUnitDialogComponent } from '../add-unit-dialog/add-unit-dialog.component';

@Component({
  selector: 'app-course-editor',
  imports: [CommonModule, DragDropModule, FormsModule, MatDialogModule],
  standalone: true,
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})

export class CourseEditorComponent implements OnInit {
  course: Course | null = null;
  selectedUnit: Unit | null = null;
  selectedResource: any = null;
  externalLink: string = '';
  expandedUnits: { [key: number]: boolean } = {};
  openMenuIndex: number | null = null;
  openUnitIndex: number | null = null;
  editingResourceIndex: number | null = null;
  newUnitName = '';
  droppedLink = '';
  loading = false;


  constructor(
    private route: ActivatedRoute,
    private courseService: CourseEditorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.courseService.getCourse().subscribe(course => {
      this.course = course;
    });
  }

  toggleUnit(index: number) {
    this.expandedUnits[index] = !this.expandedUnits[index];
  }

  selectUnit(unit: Unit) {
    this.selectedUnit = unit;
    this.selectedResource = null;
  }

  selectResource(resource: Resource) {
    this.selectedResource = resource;
  }

  deselectSelections() {
    this.selectedUnit = null;
    this.selectedResource = null;
  }

   // Alternar el menú de opciones
   toggleMenu(index: number) {
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
   }

  editResourceName(index: number) {
    this.editingResourceIndex = index;
  }
  
  saveResourceName(index: number) {
    this.editingResourceIndex = null; 
  }
  
 // Función para abrir el modal con la información del recurso seleccionado
  openEditModal(resource: Resource): void {
      const dialogRef = this.dialog.open(EditResourceDialogComponent, {
        width: '400px',
        data: { resource },
      });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Cambios guardados:', result);
    }
  });
}

  // Eliminar un recurso de una unidad
  deleteResource(unit: any, index: number): void {
    if (confirm("¿Seguro que quieres eliminar este recurso?")) {
      unit.contenido.splice(index, 1);
    }
    this.openMenuIndex = null;
    this.openUnitIndex = null;
  }

  deleteDroppedItem(event: CdkDragDrop<Unit[]>) {
    if (this.course && event.previousContainer !== event.container) {
      const deletedUnit = this.course.content.splice(event.previousIndex, 1);
      console.log("Eliminado:", deletedUnit);
      this.courseService.saveCourse();
    }
  }

 // Manejo de arrastrar y soltar unidades
 dropUnit(event: CdkDragDrop<Unit[]>) {
  if (this.course) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(this.course.content, event.previousIndex, event.currentIndex);
      this.courseService.saveCourse();
    }
  }
}

// Reordenar recursos dentro de una unidad
dropResource(event: CdkDragDrop<Resource[]>, unitIndex: number) {
  if (this.course) {
    moveItemInArray(this.course.content[unitIndex].contenido, event.previousIndex, event.currentIndex);
    this.courseService.saveCourse();
  }
}

openAddUnitDialog(): void {
  const dialogRef = this.dialog.open(AddUnitDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result.contenido) {
      this.courseService.addUnit(result.contenido); 
      if (this.course) {
        this.course = { ...this.course };
      }
    }
  });
}

openAddUnitModal() {
  this.openAddUnitDialog();
}

onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent) {
  event.preventDefault();
  this.loading = true;
  setTimeout(() => {
    const data = event.dataTransfer?.getData('text');
    if (data) {
      this.droppedLink = data;
    }
    this.loading = false;
  }, 1000);
}

addUnit(content: Resource[]) {
  if (this.course) {
    const newUnit: Unit = {
      unidad: this.course.content.length + 1, 
      contenido: content 
    };
    this.course.content.push(newUnit);
    this.courseService.saveCourse(); 
  }
}

closeDialog() {
  this.dialog.closeAll();
}

}