import { TestBed } from '@angular/core/testing';

import { CourseEditorService } from './course-editor.service';

describe('CourseEditorServiceService', () => {
  let service: CourseEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
