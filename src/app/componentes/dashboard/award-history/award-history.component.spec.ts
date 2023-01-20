import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardHistoryComponent } from './award-history.component';

describe('AwardHistoryComponent', () => {
  let component: AwardHistoryComponent;
  let fixture: ComponentFixture<AwardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
