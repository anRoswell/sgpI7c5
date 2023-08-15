import { TestBed } from '@angular/core/testing';

import { InitializeAppService } from './initialize-app.service';

describe('InitializeAppService', () => {
  let service: InitializeAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitializeAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
