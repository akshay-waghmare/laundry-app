import { TestBed } from '@angular/core/testing';

import { TennisaRankingService } from './tennisa-ranking.service';

describe('TennisaRankingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TennisaRankingService = TestBed.get(TennisaRankingService);
    expect(service).toBeTruthy();
  });
});
