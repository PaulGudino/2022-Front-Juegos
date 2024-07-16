import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSummaryRolldiceComponent } from './game-summary-rolldice.component';

describe('GameSummaryRolldiceComponent', () => {
  let component: GameSummaryRolldiceComponent;
  let fixture: ComponentFixture<GameSummaryRolldiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryRolldiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryRolldiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
