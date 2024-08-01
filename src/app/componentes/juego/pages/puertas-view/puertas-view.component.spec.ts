import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuertasViewComponent } from './puertas-view.component';

describe('PuertasViewComponent', () => {
  let component: PuertasViewComponent;
  let fixture: ComponentFixture<PuertasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuertasViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuertasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
