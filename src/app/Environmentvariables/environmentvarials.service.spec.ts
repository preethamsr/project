import { TestBed } from '@angular/core/testing';

import { EnvironmentvarialsService } from './environmentvarials.service';

describe('EnvironmentvarialsService', () => {
  let service: EnvironmentvarialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentvarialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
