import { TestBed } from '@angular/core/testing';

import { StorajeService } from './storaje.service';

describe('StorajeService', () => {
  let service: StorajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
