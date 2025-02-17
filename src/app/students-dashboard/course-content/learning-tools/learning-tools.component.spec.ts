import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningToolsComponent } from './learning-tools.component';

describe('LearningToolsComponent', () => {
  let component: LearningToolsComponent;
  let fixture: ComponentFixture<LearningToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
