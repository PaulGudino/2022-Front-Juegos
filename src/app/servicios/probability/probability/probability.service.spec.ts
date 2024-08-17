import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa para pruebas HTTP si es necesario
import { ProbabilityService } from './probability.service'; // Asegúrate de que la ruta sea correcta

describe('ProbabilityService', () => {
  let service: ProbabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo HTTP de pruebas si ProbabilityService usa HttpClient
      providers: [ProbabilityService] // Proporciona el servicio
    });
    service = TestBed.inject(ProbabilityService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado
  });
});
