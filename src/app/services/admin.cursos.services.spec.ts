import { TestBed } from '@angular/core/testing';
import { CursoService } from './admin.cursos.services';

describe('CursoService', () => {
  let service: CursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursoService]
    });
    service = TestBed.inject(CursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
