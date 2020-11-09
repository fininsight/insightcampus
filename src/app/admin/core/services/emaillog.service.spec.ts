import { TestBed, async, inject } from '@angular/core/testing';
import { EmailLogService } from './emaillog.service';

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailLogService]
    });
  });

  it('should ...', inject([EmailLogService], (service: EmailLogService) => {
    expect(service).toBeTruthy();
  }));
});
