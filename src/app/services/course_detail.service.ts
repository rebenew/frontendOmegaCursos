import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailService {
  private coursesUrl = '/assets/courses.json';

  async getCourseById(courseId: number): Promise<any | null> {
    try {
      const response = await fetch(this.coursesUrl);
      if (!response.ok) throw new Error('Error al cargar la información del curso');
      const courses = await response.json();
      return courses.find((course: any) => course.id === courseId) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
