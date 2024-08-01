import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSummaryDoorsComponent } from './game-summary-doors.component';

describe('GameSummaryDoorsComponent', () => {
  let component: GameSummaryDoorsComponent;
  let fixture: ComponentFixture<GameSummaryDoorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryDoorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
