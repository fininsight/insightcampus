/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CodeService } from './code.service';

describe('Service: Code', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeService]
    });
  });

  it('should ...', inject([CodeService], (service: CodeService) => {
    expect(service).toBeTruthy();
  }));
});
