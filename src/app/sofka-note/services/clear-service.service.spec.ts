import { TestBed } from '@angular/core/testing';

import { ClearService } from './clear-service.service';

describe('ClearServiceService', () => {
  let service: ClearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
