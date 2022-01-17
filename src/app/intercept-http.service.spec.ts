import { TestBed } from '@angular/core/testing';

import { InterceptHttpService } from './intercept-http.service';

describe('InterceptHttpService', () => {
  let service: InterceptHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
