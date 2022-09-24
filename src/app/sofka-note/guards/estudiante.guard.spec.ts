import { TestBed } from '@angular/core/testing';

import { EstudianteGuard } from './estudiante.guard';

describe('EstudianteGuard', () => {
  let guard: EstudianteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EstudianteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
