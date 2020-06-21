import { TestBed } from '@angular/core/testing';

import { MaoObraService } from './mao-obra.service';

describe('MaoObraService', () => {
  let service: MaoObraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaoObraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
