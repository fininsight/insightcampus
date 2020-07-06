import { TestBed } from '@angular/core/testing';

import { IncamAddfareService } from './incam-addfare.service';

describe('IncamAddfareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncamAddfareService = TestBed.get(IncamAddfareService);
    expect(service).toBeTruthy();
  });
});
