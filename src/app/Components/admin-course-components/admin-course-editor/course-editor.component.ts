import { Component, OnInit } from '@angular/core';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Unit, Resource } from '../../../models/admin-course-models/course-editor-model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-editor',
  imports: [CommonModule, DragDropModule, FormsModule],
  standalone: true,
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})

export class CourseEditorComponent implements OnInit {
  course: Course | null = null;
  selectedUnit: Unit | null = null;
  selectedResource: Resource | null = null;
  externalLink: string = '';
  expandedUnits: { [key: number]: boolean } = {};
  openMenuIndex: number | null = null;
  openUnitIndex: number | null = null;
  editingResourceIndex: number | null = null;
  editingContentIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseEditorService
  ) {}

  ngOnInit() {
    this.courseService.getCourse().subscribe(course => {
      this.course = course;
    });
  }

  toggleUnit(index: number) {
    if (!this.expandedUnits.hasOwnProperty(index)) {
      this.expandedUnits[index] = false;
    }
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

  
  toggleMenu(index: number) {
    console.log("Índice del menú antes:", this.openMenuIndex);
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
    console.log("Índice del menú después:", this.openMenuIndex);
  }

  editResourceName(index: number) {
    this.editingResourceIndex = index;
  }
  
  saveResourceName(index: number) {
    this.editingResourceIndex = null; 
  }
  
  editResourceContent(unitIndex: number, resourceIndex: number) {
    console.log(`Editando recurso en unidad ${unitIndex}, recurso ${resourceIndex}`);
    this.editingContentIndex = resourceIndex;
    this.selectedUnit = this.course?.content[unitIndex] ?? null;
    this.selectedResource = this.selectedUnit?.contenido[resourceIndex] ?? null;
  }
  
  saveResourceContent(unitIndex: number, resourceIndex: number) {
    if (this.selectedResource && this.selectedUnit) {
      console.log(`Guardando cambios en recurso ${resourceIndex} de la unidad ${unitIndex}`);
      this.selectedResource.Link = this.selectedResource.Link.trim(); // Evitar espacios extra
    }
  
    this.editingContentIndex = null; // Salir del modo de edición
  }

  // Agregar nueva unidad
  addUnit() {
    this.courseService.addUnit("Nueva Unidad");
    if (this.course) {
      this.course = { ...this.course };
    }
  }



  // Eliminar una unidad
  deleteUnit(unitIndex: number) {
    this.courseService.removeUnit(unitIndex);
    if (this.course) {
      this.course = { ...this.course };
    }
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
  // Manejo de carga de archivos
  onFileSelected(event: Event, resource: Resource) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      resource.ResourceName = file.name;
      console.log(`Archivo cargado en ${resource.ResourceName}:`, file.name);
    }
  }
}