import { TestBed } from '@angular/core/testing';

import { OrdensServicosService } from './ordens-servicos.service';

describe('OrdensServicosService', () => {
  let service: OrdensServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdensServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
