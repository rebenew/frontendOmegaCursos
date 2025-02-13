import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminCourseFormComponent } from './admin-course-form.component';

describe('AdmincourseFormComponent', () => {
  let component: AdminCourseFormComponent;
  let fixture: ComponentFixture<AdminCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, AdminCourseFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
