import { TestBed } from '@angular/core/testing';

import { PasswordGuardGuard } from './password-guard.guard';

describe('PasswordGuardGuard', () => {
  let guard: PasswordGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasswordGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
