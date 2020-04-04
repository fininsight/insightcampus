/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CodegroupService } from './codegroup.service';

describe('Service: Codegroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodegroupService]
    });
  });

  it('should ...', inject([CodegroupService], (service: CodegroupService) => {
    expect(service).toBeTruthy();
  }));
});
