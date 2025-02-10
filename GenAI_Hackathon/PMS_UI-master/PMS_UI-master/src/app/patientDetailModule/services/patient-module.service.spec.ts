import { TestBed } from '@angular/core/testing';

import { PatientModuleService } from './patient-module.service';

describe('PatientModuleService', () => {
  let service: PatientModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
