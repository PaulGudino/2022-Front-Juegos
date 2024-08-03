import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ResultMessageComponent } from './result-message.component';

describe('ResultMessageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultMessageComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ResultMessageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
