import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPrecisionComponent } from './design-precision.component';

describe('DesignPrecisionComponent', () => {
  let component: DesignPrecisionComponent;
  let fixture: ComponentFixture<DesignPrecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignPrecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignPrecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
