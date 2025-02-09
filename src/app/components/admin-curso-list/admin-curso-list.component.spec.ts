import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminCursoListComponent } from './admin-curso-list.component';
import { CursoService } from '../../services/admin.cursos.services';

describe('AdminCursoListComponent', () => {
  let component: AdminCursoListComponent;
  let fixture: ComponentFixture<AdminCursoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterTestingModule, AdminCursoListComponent],
      providers: [CursoService]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCursoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
