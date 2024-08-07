import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ModalComponent } from './modal.component';
import { AwardsService } from '../../../../servicios/awards/awards.service';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { Publicity } from 'src/app/interfaces/publicity/publicity';

// Mock del servicio AwardsService
class MockAwardsService {
  getAward() {
    return of([
      { category: 'Category1', name: 'Award1' } as getAwardList,
      { category: 'Category2', name: 'Award2' } as getAwardList
    ]);
  }
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockAwardsService: MockAwardsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers: [
        { provide: AwardsService, useClass: MockAwardsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    mockAwardsService = TestBed.inject(AwardsService) as unknown as MockAwardsService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
