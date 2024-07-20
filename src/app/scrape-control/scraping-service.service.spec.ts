import { TestBed } from '@angular/core/testing';

import { ScrapingServiceService } from './scraping-service.service';

describe('ScrapingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrapingServiceService = TestBed.get(ScrapingServiceService);
    expect(service).toBeTruthy();
  });
});
