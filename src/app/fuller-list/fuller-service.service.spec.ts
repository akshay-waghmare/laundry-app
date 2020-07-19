import { TestBed } from '@angular/core/testing';

import { FullerServiceService } from './fuller-service.service';

describe('FullerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullerServiceService = TestBed.get(FullerServiceService);
    expect(service).toBeTruthy();
  });
});
