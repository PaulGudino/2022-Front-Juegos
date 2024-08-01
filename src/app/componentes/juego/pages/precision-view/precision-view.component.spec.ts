import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecisionViewComponent } from './precision-view.component';

describe('PrecisionViewComponent', () => {
  let component: PrecisionViewComponent;
  let fixture: ComponentFixture<PrecisionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecisionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecisionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
