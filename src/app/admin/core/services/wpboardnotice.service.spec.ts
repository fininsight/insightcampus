import { TestBed } from '@angular/core/testing';

import { WpboardNoticeService } from './wpboardnotice.service';

describe('WpboardNoticeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpboardNoticeService = TestBed.get(WpboardNoticeService);
    expect(service).toBeTruthy();
  });
});
