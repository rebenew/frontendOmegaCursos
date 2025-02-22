import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserButtonComponent } from './add-user-button.component';

describe('AddUserButtonComponent', () => {
  let component: AddUserButtonComponent;
  let fixture: ComponentFixture<AddUserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
