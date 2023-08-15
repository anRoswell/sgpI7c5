import { TestBed } from '@angular/core/testing';

import { CheckconnectionService } from './checkconnection.service';

describe('CheckconnectionService', () => {
  let service: CheckconnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckconnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
