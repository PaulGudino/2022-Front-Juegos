import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RolesService } from './roles.service';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Roles } from 'src/app/interfaces/roles/roles';

// Mock para PuenteDatosService
class MockPuenteDatosService {
  geturl() {
    return 'http://mock-api-url/';
  }
}

describe('RolesService', () => {
  let service: RolesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RolesService,
        { provide: PuenteDatosService, useClass: MockPuenteDatosService }
      ]
    });

    service = TestBed.inject(RolesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
