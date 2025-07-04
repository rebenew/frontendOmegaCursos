import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Course, CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../admin-search-bar/search-bar.component';
import { SearchService } from '../../../services/admin-course-services/search-service/search.service';
import { AdminCourseListComponent } from '../admin-course-list/admin-course-list.component';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs'; 

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,  
  imports: [CommonModule, RouterModule, SearchBarComponent, AdminCourseListComponent, MatDialogModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  private router: Router;
  private dialog: MatDialog;
  private searchService: SearchService;
  private courseService: CourseService 

  filteredCourses$: Observable<Course[]>;

  isGridView = false;
  selectedCourseId: number | null = null;

  constructor(
    searchService: SearchService,
    courseService: CourseService,
    router: Router,
    dialog: MatDialog
    
  ) {
    this.searchService = searchService;
    this.courseService = courseService;
    this.router = router;
    this.dialog = dialog;
    this.filteredCourses$ = this.searchService.filteredCourses$; 
  }

  search(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchService.setSearchTerm(term); 
  }


  navigateTo(path: string, id?: number) {
    this.router.navigate([path, id].filter(Boolean));
  }

  deleteCourse(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { itemName: `Curso ID: ${id}`, itemType: 'curso' }
    });
  
    dialogRef.afterClosed().pipe(
      switchMap(result => result ? this.courseService.deleteCourse(id) : of(null))
    ).subscribe({
      next: () => {
        this.courseService.reloadCourses(); 
      },
      error: err => console.error('Error al eliminar el curso', err)
    });
  }
  
  toggleView() {
    this.isGridView = !this.isGridView;
  }

  toggleCourseDetails(courseId: number) {
    this.selectedCourseId = this.selectedCourseId === courseId ? null : courseId;
  }

  createNewCourse() {
    this.router.navigate(['admin-dashboard/courses/new']);
  }

  editCourseView(id: number) {
    this.router.navigate(['admin-dashboard/courses/edit-view', id]);
  }

  editCourseContent(id: number) {
    this.router.navigate(['admin-dashboard/courses/edit-content', id]);
  }

  getTagNames(course: Course): string {
    return course.tags?.map(tag => tag.name).join(', ') || '';
  }

}