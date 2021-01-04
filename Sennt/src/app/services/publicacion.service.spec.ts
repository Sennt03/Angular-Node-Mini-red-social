import { TestBed } from '@angular/core/testing';

import { PublicacionService } from './publicacion.service';

describe('PublicacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicacionService = TestBed.get(PublicacionService);
    expect(service).toBeTruthy();
  });
});
