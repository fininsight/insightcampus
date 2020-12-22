import { TestBed } from '@angular/core/testing';

import { FinWorkService } from './fin-work.service';

describe('FinWorkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinWorkService = TestBed.get(FinWorkService);
    expect(service).toBeTruthy();
  });
});
