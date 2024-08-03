import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchService } from './match.service';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

describe('MatchService', () => {
  let service: MatchService;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MatchService,
        { provide: PuenteDatosService, useValue: { geturl: () => 'http://127.0.0.1:8000/' } }
      ]
    });

    service = TestBed.inject(MatchService);
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = 'http://127.0.0.1:8000/';
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
