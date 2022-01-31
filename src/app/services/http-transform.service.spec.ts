import { TestBed } from '@angular/core/testing';

import { HttpTransformService } from './http-transform.service';

describe('HttpTransformService', () => {
  let service: HttpTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
