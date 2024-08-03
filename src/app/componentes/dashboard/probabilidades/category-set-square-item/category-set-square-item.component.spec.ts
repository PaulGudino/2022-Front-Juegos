import { TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { CategorySetSquareItemComponent } from './category-set-square-item.component';

describe('CategorySetSquareItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySetSquareItemComponent],
      imports: [MatIconModule]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CategorySetSquareItemComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
