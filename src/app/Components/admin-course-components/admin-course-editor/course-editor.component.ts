import { Component, OnInit } from '@angular/core';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Module, Topic, Subtopic } from '../../../models/admin-course-models/course-editor-model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-editor',
  imports: [CommonModule, CdkDropList, FormsModule, DragDropModule],
  standalone: true,
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})
export class CourseEditorComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  selectedModule: Module | null = null;
  selectedTopic: Topic | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseEditorService
  ) {}

  ngOnInit() {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.selectedCourse = this.courses.find(course => course.id === courseId) || null;
    });
  }

  selectModule(module: Module) {
    this.selectedModule = module;
    this.selectedTopic = null;
  }

  selectTopic(topic: Topic) {
    this.selectedTopic = topic;
    this.selectedModule = null;
  }

  deselectSelections() {
    this.selectedModule = null;
    this.selectedTopic = null;
  }

  addModule() {
    if (this.selectedCourse) {
      this.courseService.addModule(this.selectedCourse.id, "Nuevo Módulo");
      this.selectedCourse = { ...this.selectedCourse };
    }
  }

  addTopic(module: Module) {
    this.courseService.addTopic(module, "Nuevo Topic");
  }

  addSubtopic(topic: Topic) {
    this.courseService.addSubtopic(topic, "Nuevo Subtopic");
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log('Evento detectado:', event);
    if (!event.container.data || !event.previousContainer.data) {
      console.warn('No hay datos en el contenedor');
      return;
    }
  
    console.log('Índice previo:', event.previousIndex);
    console.log('Índice nuevo:', event.currentIndex);
  
    if (this.selectedCourse && this.selectedCourse.modules) {
      moveItemInArray(this.selectedCourse.modules, event.previousIndex, event.currentIndex);
    }
  }
  deleteDrop(event: CdkDragDrop<Module[]>) {
    console.log("Intentando eliminar un módulo");

    if (!this.selectedCourse) return;

    const moduleToDelete = this.selectedCourse.modules[event.previousIndex];
    console.log("Eliminando:", moduleToDelete);

    this.selectedCourse.modules = this.selectedCourse.modules.filter(m => m !== moduleToDelete);
    this.courseService.saveCourses();
  }

  editModule(module: Module) {
    module.isEditing = true;
  }

  deleteModule(module: Module) {
    if (!this.selectedCourse) return;
    this.selectedCourse.modules = this.selectedCourse.modules.filter(m => m !== module);
  }

  editTopic(topic: Topic) {
    topic.isEditing = true;
  }

  deleteTopic(topic: Topic) {
    if (this.selectedModule) {
      this.selectedModule.topics = this.selectedModule.topics.filter(t => t !== topic);
    }
  }

  onFileSelected(event: Event, entity: Module | Topic | null, fileType: string) {
    if (!entity) return;

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      entity.fileName = file.name;
      console.log(`Archivo (${fileType}) cargado en ${entity.title}:`, file.name);
    }
  }
  get externalLink(): string {
    return this.selectedModule?.externalLink || this.selectedTopic?.externalLink || '';
  }
  
  set externalLink(value: string) {
    if (this.selectedModule) {
      this.selectedModule.externalLink = value;
    } else if (this.selectedTopic) {
      this.selectedTopic.externalLink = value;
    }
  }
  debugModule(module: any) {
    console.log("Módulo detectado:", module);
  }

  
}
