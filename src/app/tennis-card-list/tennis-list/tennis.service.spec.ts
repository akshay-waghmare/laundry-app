import { TestBed } from '@angular/core/testing';

import { TennisService } from './tennis.service';

describe('TennisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TennisService = TestBed.get(TennisService);
    expect(service).toBeTruthy();
  });
});
