import { TestBed } from '@angular/core/testing';

import { DatabaseStatusService } from './database-status.service';

describe('DatabaseStatusService', () => {
  let service: DatabaseStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
