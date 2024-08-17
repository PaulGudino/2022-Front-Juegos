import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameDateService } from './game-date.service';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

describe('GameDateService', () => {
  let service: GameDateService;
  let httpMock: HttpTestingController;
  let mockPuenteDatosService: jasmine.SpyObj<PuenteDatosService>;

  beforeEach(() => {
    mockPuenteDatosService = jasmine.createSpyObj('PuenteDatosService', ['geturl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GameDateService,
        { provide: PuenteDatosService, useValue: mockPuenteDatosService }
      ]
    });

    service = TestBed.inject(GameDateService);
    httpMock = TestBed.inject(HttpTestingController);

    mockPuenteDatosService.geturl.and.returnValue('http://localhost:3000/');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
