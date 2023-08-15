import { TestBed } from '@angular/core/testing';

import { AuthorPostsService } from './author-posts.service';

describe('AuthorPostsService', () => {
  let service: AuthorPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
