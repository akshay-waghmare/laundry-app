import { TestBed } from '@angular/core/testing';

import { BetMarketService } from './bet-market.service';

describe('BetMarketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetMarketService = TestBed.get(BetMarketService);
    expect(service).toBeTruthy();
  });
});
