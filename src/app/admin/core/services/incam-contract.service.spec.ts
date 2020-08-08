/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IncamContractService } from './incam-contract.service';

describe('Service: IncamContract', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncamContractService]
    });
  });

  it('should ...', inject([IncamContractService], (service: IncamContractService) => {
    expect(service).toBeTruthy();
  }));
});
