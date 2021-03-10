import { TestBed } from '@angular/core/testing';

import { AuthService1Service } from './auth-service1.service';

describe('AuthService1Service', () => {
  let service: AuthService1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
