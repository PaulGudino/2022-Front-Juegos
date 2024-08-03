import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa para pruebas HTTP si es necesario
import { AwardsService } from './awards.service'; // Asegúrate de que la ruta sea correcta

describe('AwardsService', () => {
  let service: AwardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo HTTP de pruebas si AwardsService usa HttpClient
      providers: [AwardsService] // Proporciona el servicio
    });
    service = TestBed.inject(AwardsService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado
  });
});
