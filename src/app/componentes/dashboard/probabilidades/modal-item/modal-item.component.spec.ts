import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ModalItemComponent } from './modal-item.component';
import { ControllerProbabilityService } from './../../../../servicios/probability/controllerProbability/controller-probability.service';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';

// Mock del servicio ControllerProbabilityService
class MockControllerProbabilityService {
  addItemToCategory() {}
  getNewAwards() {
    return [{ category: 'Category1', name: 'Award1' } as getAwardList];
  }
}

describe('ModalItemComponent', () => {
  let component: ModalItemComponent;
  let fixture: ComponentFixture<ModalItemComponent>;
  let mockController: MockControllerProbabilityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalItemComponent ],
      providers: [
        { provide: ControllerProbabilityService, useClass: MockControllerProbabilityService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalItemComponent);
    component = fixture.componentInstance;
    mockController = TestBed.inject(ControllerProbabilityService) as unknown as MockControllerProbabilityService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
