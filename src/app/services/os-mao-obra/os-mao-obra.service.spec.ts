import { TestBed } from '@angular/core/testing';

import { OsMaoObraService } from './os-mao-obra.service';

describe('OsMaoObraService', () => {
  let service: OsMaoObraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsMaoObraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
