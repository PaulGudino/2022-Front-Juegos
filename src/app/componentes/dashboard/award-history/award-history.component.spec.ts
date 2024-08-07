import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { AwardHistoryComponent } from './award-history.component';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service'; // Asegúrate de importar el servicio necesario

const mockGameDateService = {
  // Define mocks para métodos del GameDateService si es necesario
};

describe('AwardHistoryComponent', () => {
  let component: AwardHistoryComponent;
  let fixture: ComponentFixture<AwardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // Importa HttpClientTestingModule aquí
      ],
      declarations: [ AwardHistoryComponent ],
      providers: [
        { provide: GameDateService, useValue: mockGameDateService } // Proveer el mock para GameDateService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
