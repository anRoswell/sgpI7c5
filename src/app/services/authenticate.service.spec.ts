import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthenticateService } from './authenticate.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

describe('AuthenticateService', () => {
  let service: AuthenticateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticateService],
    });

    service = TestBed.inject(AuthenticateService);
  });

  it('should get users', inject(
    [HttpTestingController, AuthenticateService],
    (
      httpMock: HttpTestingController,
      authenticateService: AuthenticateService
    ) => {
      const mockUsers = [
        { name: 'Alice', website: 'example.com' },
        { name: 'Bob', website: 'example.org' },
      ];

      authenticateService.getData().subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            expect(event.body).toEqual(mockUsers);
        }
      });

      const mockReq = httpMock.expectOne(authenticateService.urlTest);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockUsers);

      httpMock.verify();
    }
  ));
});
