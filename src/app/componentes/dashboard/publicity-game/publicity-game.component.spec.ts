import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para simular las solicitudes HTTP
import { of } from 'rxjs'; // Para simular las respuestas de observables
import { PublicityGameComponent } from './publicity-game.component';
import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';

// Crea un mock para GameSelectionService
class MockGameSelectionService {
  selectedGame$ = of('testGame'); // Simula un observable con un valor de ejemplo
}

describe('PublicityGameComponent', () => {
  let component: PublicityGameComponent;
  let fixture: ComponentFixture<PublicityGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicityGameComponent ],
      imports: [ HttpClientTestingModule ], // Agrega HttpClientTestingModule si hay peticiones HTTP
      providers: [
        PuenteDatosService,
        { provide: GameSelectionService, useClass: MockGameSelectionService } // Usa el mock en lugar del servicio real
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicityGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
