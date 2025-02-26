import { Injectable } from '@angular/core';
import { Course } from '../../../models/admin-course-models/course-editor-model'

@Injectable({
  providedIn: 'root'
})
export class CourseEditorService{
  private courses: Course[] = [];

constructor() {
  this.loadCourses();
}

getCourses(): Course[] { 
  return this.courses;
}

addModule (courseId: number, title: string) { 
  const course = this.courses.find(c => c.id === courseId);
  if (course) {
    course.modules.push ({
      id: Date.now(),
      title,
      topics: [], 
    })
    this.saveCourses(); 
  }
}
private loadCourses() { 
  const data = localStorage.getItem('courses');
  this.courses = data ? JSON.parse(data) : [];
}
 saveCourses() { 
  localStorage.setItem('courses', JSON.stringify(this.courses))
}

}
