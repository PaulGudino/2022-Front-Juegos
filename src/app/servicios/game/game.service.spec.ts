import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa para pruebas HTTP si es necesario
import { GameService } from './game.service'; // Asegúrate de que la ruta sea correcta

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo HTTP de pruebas si GameService usa HttpClient
      providers: [GameService] // Proporciona el servicio
    });
    service = TestBed.inject(GameService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado
  });
});
