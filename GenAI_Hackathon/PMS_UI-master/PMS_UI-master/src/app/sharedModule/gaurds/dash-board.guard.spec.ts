import { TestBed } from '@angular/core/testing';

import { DashBoardGuard } from './dash-board.guard';

describe('DashBoardGuard', () => {
  let guard: DashBoardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashBoardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
