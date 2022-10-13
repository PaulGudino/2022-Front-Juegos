import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanViewComponent } from './scan-view.component';

describe('ScanViewComponent', () => {
  let component: ScanViewComponent;
  let fixture: ComponentFixture<ScanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
