import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSummaryPrecisionComponent } from './game-summary-precision.component';

describe('GameSummaryPrecisionComponent', () => {
  let component: GameSummaryPrecisionComponent;
  let fixture: ComponentFixture<GameSummaryPrecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryPrecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryPrecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
