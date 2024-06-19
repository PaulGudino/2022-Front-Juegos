import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolldiceViewComponent } from './rolldice-view.component';

describe('RolldiceViewComponent', () => {
  let component: RolldiceViewComponent;
  let fixture: ComponentFixture<RolldiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolldiceViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolldiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
