import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignRolldiceComponent } from './design-rolldice.component';

describe('DesignRolldiceComponent', () => {
  let component: DesignRolldiceComponent;
  let fixture: ComponentFixture<DesignRolldiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignRolldiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignRolldiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
