import { TestBed } from '@angular/core/testing';

import { RecommenedService } from './recommened.service';

describe('RecommenedService', () => {
  let service: RecommenedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommenedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
