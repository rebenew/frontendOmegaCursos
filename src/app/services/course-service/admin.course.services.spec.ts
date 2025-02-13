import { TestBed } from '@angular/core/testing';
import { CourseService } from './admin.course.services';

describe('CursoService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
