import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDoorsComponent } from './design-doors.component';

describe('DesignDoorsComponent', () => {
  let component: DesignDoorsComponent;
  let fixture: ComponentFixture<DesignDoorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignDoorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
