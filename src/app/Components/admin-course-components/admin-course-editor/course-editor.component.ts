import { Component, OnInit } from '@angular/core';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Module, Topic, Subtopic } from '../../../models/admin-course-models/course-editor-model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course-editor',
  imports: [CommonModule, CdkDropList, FormsModule],
  standalone: true,
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})
export class CourseEditorComponent implements OnInit{
  courses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseEditorService){}
  
  ngOnInit() {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourses().subscribe(data => { 
      this.courses = data;
      console.log("📌 Cursos cargados:", this.courses);

      this.selectedCourse = this.courses.find(course => course.id === courseId) || null;

      if (this.selectedCourse) {
        console.log("✅ Curso seleccionado:", this.selectedCourse);
      } else {
        console.error("❌ Curso no encontrado con ID:", courseId);
      }
    });
  }
  
  selectCourse(course: Course) {
    this.selectedCourse = course;
  }

  addModule() {
    if (this.selectedCourse) {
      this.courseService.addModule(this.selectedCourse.id, "Nuevo Módulo");
      this.selectedCourse = { ...this.selectedCourse };
    }
  }
  drop (event: CdkDragDrop<Module[]>) { 
    if (this.selectedCourse) { 
      moveItemInArray(this.selectedCourse.modules, event.previousIndex, event.currentIndex);
      this.courseService.saveCourses();
    }
  }
  editModule(module: Module) {
    module.isEditing = true; 
  }
  
  saveModule(module: Module) {
    module.isEditing = false; 
    this.courseService.saveCourses(); 
  }

  deleteModule(module: Module) {
    if (!this.selectedCourse) return;
    this.selectedCourse.modules = this.selectedCourse.modules.filter(m => m !== module);
  }
  
  deleteTopic(module: Module, topic: Topic) {
    module.topics = module.topics.filter(t => t !== topic);
  }
  
  deleteSubtopic(topic: Topic, subtopic: Subtopic) {
    topic.subtopics = topic.subtopics.filter(s => s !== subtopic);
  }

  editTopic(topic: Topic) {
    topic.isEditing = true;
  }
  
  saveTopic(topic: Topic) {
    topic.isEditing = false;
  }
  
  editSubtopic(subtopic: Subtopic) {
    subtopic.isEditing = true;
  }
  
  saveSubtopic(subtopic: Subtopic) {
    subtopic.isEditing = false;
  }
  
  onFileSelected(event: Event, module: Module) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      module.fileName = file.name;
      console.log(`Archivo cargado en ${module.title}:`, file.name);
    }
  }
}