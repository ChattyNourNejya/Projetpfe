import { TestBed } from '@angular/core/testing';

import { UserAccService } from './user-acc.service';

describe('UserAccService', () => {
  let service: UserAccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
