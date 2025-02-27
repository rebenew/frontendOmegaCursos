import { Injectable } from '@angular/core';
import { Course, Topic, Subtopic, Module } from '../../../models/admin-course-models/course-editor-model'
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseEditorService{
  private jsonUrl = 'assets/db.json'
  private courses: Course[] = [];

  constructor(private http: HttpClient) {
    this.loadCourses(); 
  } 

  getCourses(): Observable<Course[]> {
    return this.http.get<{ courses: Course[] }>(this.jsonUrl).pipe(
      map(data => data.courses || []) 
    );
  }

  addModule (courseId: number, title: string) { 
    this.getCourses().subscribe(courses =>{
    const course = courses.find(c => c.id === courseId)
    if (course) {
      course.modules.push({
        id: Date.now(),
        title,
        topics: [],
      });
      this.saveCourses();
    }
  });
  
}
  addTopic(module: Module, title: string) {
    const newTopic: Topic = {
      id: Date.now(),
      title,
      subtopics: [],
      isEditing: false
    };
    module.topics.push(newTopic);
    this.saveCourses();
  }

addSubtopic(topic: Topic, title: string) {
  const newSubtopic: Subtopic = {
    id: Date.now(),
    title,
    isEditing: false,
    files: []
  };
  topic.subtopics.push(newSubtopic);
  this.saveCourses();
}

private loadCourses() {
  if (typeof window !== 'undefined' && localStorage.getItem('courses')) {
    const data = localStorage.getItem('courses');
    this.courses = data ? JSON.parse(data) : [];
  } else {
    this.courses = [];
  }
}
  saveCourses() {
    localStorage.setItem('courses', JSON.stringify(this.courses));
  }
}
