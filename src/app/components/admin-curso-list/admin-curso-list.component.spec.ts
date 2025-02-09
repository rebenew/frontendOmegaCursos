import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCursoListComponent } from './admin-curso-list.component';

describe('AdminCursoListComponent', () => {
  let component: AdminCursoListComponent;
  let fixture: ComponentFixture<AdminCursoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCursoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCursoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
