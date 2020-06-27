import { TestBed } from '@angular/core/testing';

import { OsPecasService } from './os-pecas.service';

describe('OsPecasService', () => {
  let service: OsPecasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsPecasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
