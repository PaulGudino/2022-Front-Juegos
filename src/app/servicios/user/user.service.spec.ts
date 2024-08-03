import { TestBed } from '@angular/core/testing';
import { ApiService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Usuarios } from '../../interfaces/usuarios/usuarios';
import { Roles } from '../../interfaces/roles/roles';
import { UsuariosFiltradobyRol } from '../../interfaces/usuarios/usuariofilterbyRol';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let puenteService: jasmine.SpyObj<PuenteDatosService>;

  beforeEach(() => {
    const puenteSpy = jasmine.createSpyObj('PuenteDatosService', ['geturl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: PuenteDatosService, useValue: puenteSpy }
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    puenteService = TestBed.inject(PuenteDatosService) as jasmine.SpyObj<PuenteDatosService>;
    puenteService.geturl.and.returnValue('http://mock-url/');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});