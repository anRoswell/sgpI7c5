import { TestBed } from '@angular/core/testing';

import { DbnameVersionService } from './dbname-version.service';

describe('DbnameVersionService', () => {
  let service: DbnameVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbnameVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
