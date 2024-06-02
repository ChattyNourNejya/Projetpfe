import { TestBed } from '@angular/core/testing';

import { StayserviceService } from './stayservice.service';

describe('StayserviceService', () => {
  let service: StayserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StayserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
