import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa para pruebas HTTP si es necesario
import { PermisosService } from './permisos.service'; // Asegúrate de que la ruta sea correcta

describe('PermisosService', () => {
  let service: PermisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo HTTP de pruebas si PermisosService usa HttpClient
      providers: [PermisosService] // Proporciona el servicio
    });
    service = TestBed.inject(PermisosService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado
  });

  // Puedes agregar más pruebas aquí para verificar métodos específicos del servicio
});