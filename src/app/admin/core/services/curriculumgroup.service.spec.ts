import { TestBed } from '@angular/core/testing';

import { CurriculumgroupService } from './curriculumgroup.service';

describe('CurriculumgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurriculumgroupService = TestBed.get(CurriculumgroupService);
    expect(service).toBeTruthy();
  });
});
