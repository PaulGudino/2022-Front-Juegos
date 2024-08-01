import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiongameViewComponent } from './selectiongame-view.component';

describe('SelectiongameViewComponent', () => {
  let component: SelectiongameViewComponent;
  let fixture: ComponentFixture<SelectiongameViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectiongameViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectiongameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
