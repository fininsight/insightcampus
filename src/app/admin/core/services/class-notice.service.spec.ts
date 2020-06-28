/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { ClassNoticeService } from './class-notice.service';

describe('Service: ClassNotice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassNoticeService]
    });
  });

  it('should ...', inject([ClassNoticeService], (service: ClassNoticeService) => {
    expect(service).toBeTruthy();
  }));
});