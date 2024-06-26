import { TestBed } from '@angular/core/testing';

import { GameCurrentSessionService } from './game-current-session.service';

describe('GameCurrentSessionService', () => {
  let service: GameCurrentSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCurrentSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
