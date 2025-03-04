import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CourseService } from '../course-service/admin.course.services';
import { Course } from '../course-service/admin.course.services';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
private searchTerm = new BehaviorSubject<string>('');
filteredCourses$: Observable<Course[]>;

constructor(private courseService: CourseService) {
  this.filteredCourses$ = combineLatest([
    this.courseService.courses$, 
    this.searchTerm
  ]).pipe(
    map(([courses, term]) =>
      courses?.filter((course: Course) =>
        course.title.toLowerCase().includes(term.toLowerCase())
      ) ?? []
    )
  );
}

setSearchTerm(term: string) {
  this.searchTerm.next(term);
}

deleteCourse(id: number) {
  this.courseService.deleteCourse(id);
}
}
