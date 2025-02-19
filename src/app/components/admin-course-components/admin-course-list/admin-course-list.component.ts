import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../../services/admin-course-services/search-service/search.service';
import { SearchBarComponent } from "../admin-search-bar/search-bar.component";
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent, SidebarComponent],
})
export class AdminCourseListComponent implements OnInit, OnDestroy {
onSearch(searchValue: string) {
this.searchService.setSearchTerm(searchValue);
}
  courses: Course[] = [];
  filteredCourses: Course[] = []
  private subscription: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(private courseService: CourseService, 
              private router: Router, 
              private searchService: SearchService) {}

  ngOnInit() {
      this.subscription.add(
        this.courseService.getCourses().subscribe({
          next: (courses) => {
            this.courses = courses;
            this.filteredCourses = courses;
          },
          error: (error) => {
            this.errorMessage = `Error al cargar los cursos: ${error.message}`;
          }
      })
    );

    this.subscription.add(
      this.searchService.searchTerm$.subscribe(term => {
      this.filteredCourses = this.courses.filter(course => 
        course.title.toLowerCase().includes(term.toLowerCase()));
  })
);

  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  editCourse(id: number) {
    this.router.navigate(['/courses/edit', id]);
  }
}
