import { TestBed } from '@angular/core/testing';

import { PWAService } from './pwa.service';

describe('PWAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PWAService = TestBed.get(PWAService);
    expect(service).toBeTruthy();
  });
});
