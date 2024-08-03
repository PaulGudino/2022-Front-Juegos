import { TestBed } from '@angular/core/testing';
import { PublicityService } from './publicity.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Publicity } from '../../interfaces/publicity/publicity';
import { PublicityConfig } from '../../interfaces/publicityConfig/PublicityConfig';

describe('PublicityService', () => {
  let service: PublicityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicityService, PuenteDatosService]
    });
    service = TestBed.inject(PublicityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});