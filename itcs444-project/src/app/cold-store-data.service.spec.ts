import { TestBed } from '@angular/core/testing';

import { ColdStoreDataService } from './cold-store-data.service';

describe('ColdStoreDataService', () => {
  let service: ColdStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColdStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
