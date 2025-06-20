import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminCursoFormComponent } from './admin-curso-form.component';

describe('AdminCursoFormComponent', () => {
  let component: AdminCursoFormComponent;
  let fixture: ComponentFixture<AdminCursoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, AdminCursoFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
