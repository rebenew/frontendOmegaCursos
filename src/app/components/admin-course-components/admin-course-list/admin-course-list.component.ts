import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchService } from '../../../services/admin-course-services/search-service/search.service';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],
})
export class AdminCourseListComponent {
  @Input() filteredCourses: Course[] = [];
  @Output() deleteCourse = new EventEmitter<number>();
  @Output() editCourseView = new EventEmitter<number>();
  @Output() editCourseContent = new EventEmitter<number>();
  @Output() toggleCourseDetails = new EventEmitter<number | undefined>();
  
  selectedCourseId: number | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private searchService: SearchService
  ) {}

  getSelectedCourse(): Course | null {
    return this.filteredCourses.find(c => c.id === this.selectedCourseId) || null;
  }

  onDelete(id: number) {
    this.deleteCourse.emit(id);
  }

  onEditView(id: number) {
    this.editCourseView.emit(id);
  }

  onEditContent(id: number) {
    this.editCourseContent.emit(id);
  }

onToggleDetails(course: Course) {
  this.selectedCourseId = this.selectedCourseId === course.id ? null : course.id;
  this.toggleCourseDetails.emit(this.selectedCourseId ?? undefined);
}

  showDetails(course: Course) {
    this.selectedCourseId = course.id;
  }

}
