import { TestBed } from '@angular/core/testing';

import { ClassReviewService } from './class-review.service';

describe('ClassReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassReviewService = TestBed.get(ClassReviewService);
    expect(service).toBeTruthy();
  });
});
