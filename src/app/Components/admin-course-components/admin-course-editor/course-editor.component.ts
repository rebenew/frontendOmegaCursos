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

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseEditorService
  ) {}

  ngOnInit() {
    this.courseService.getCourse().subscribe(course => {
      this.course = course;
    });
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

  // Agregar nueva unidad

  addUnit() {
    this.courseService.addUnit("Nueva Unidad");
    if (this.course) {
      this.course = { ...this.course };
    }
  }

  // Agregar nuevo recurso a una unidad específica

  addResource(unitIndex: number) {
    this.courseService.addResource(unitIndex, "Nuevo Recurso", "https://example.com", "<iframe></iframe>");
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
  deleteResource(unitIndex: number, resourceIndex: number) {
    this.courseService.removeResource(unitIndex, resourceIndex);
    if (this.course) {
      this.course = { ...this.course };
    }
  }

 // Manejo de arrastrar y soltar unidades
 dropUnit(event: CdkDragDrop<Unit[]>) {
  if (this.course) {
    moveItemInArray(this.course.content, event.previousIndex, event.currentIndex);
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