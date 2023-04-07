import { TestBed } from '@angular/core/testing';

import { NotLoggedInService } from './not-logged-in.service';

describe('NotLoggedInService', () => {
  let service: NotLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
