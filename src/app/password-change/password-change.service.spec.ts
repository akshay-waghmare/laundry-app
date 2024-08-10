import { TestBed } from '@angular/core/testing';

import { PasswordChangeService } from './password-change.service';

describe('PasswordChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordChangeService = TestBed.get(PasswordChangeService);
    expect(service).toBeTruthy();
  });
});
