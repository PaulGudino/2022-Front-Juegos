import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa para pruebas HTTP si es necesario
import { GameLogicService } from './game-logic.service'; // Asegúrate de que la ruta sea correcta

describe('GameLogicService', () => {
  let service: GameLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo HTTP de pruebas si GameLogicService usa HttpClient
      providers: [GameLogicService] // Proporciona el servicio
    });
    service = TestBed.inject(GameLogicService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado
  });
});
