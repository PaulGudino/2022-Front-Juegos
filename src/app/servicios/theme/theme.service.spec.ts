import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThemeService } from './theme.service';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Styles } from 'src/app/interfaces/styles/Styles';

describe('ThemeService', () => {
  let service: ThemeService;
  let httpMock: HttpTestingController;
  let puenteDatosServiceSpy: jasmine.SpyObj<PuenteDatosService>;

  beforeEach(() => {
    // Crear un spy para el servicio PuenteDatosService
    const spy = jasmine.createSpyObj('PuenteDatosService', ['geturl']);
    spy.geturl.and.returnValue('http://localhost:8000/');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ThemeService,
        { provide: PuenteDatosService, useValue: spy }
      ]
    });

    service = TestBed.inject(ThemeService);
    httpMock = TestBed.inject(HttpTestingController);
    puenteDatosServiceSpy = TestBed.inject(PuenteDatosService) as jasmine.SpyObj<PuenteDatosService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});