import { TestBed } from '@angular/core/testing';
import { AwardsConditionService } from './awards-condition.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

describe('AwardsConditionService', () => {
  let service: AwardsConditionService;
  let httpMock: HttpTestingController;
  let puenteDatosServiceMock: jasmine.SpyObj<PuenteDatosService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PuenteDatosService', ['geturl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importa HttpClientTestingModule
      providers: [
        AwardsConditionService,
        { provide: PuenteDatosService, useValue: spy }
      ]
    });

    service = TestBed.inject(AwardsConditionService);
    httpMock = TestBed.inject(HttpTestingController);
    puenteDatosServiceMock = TestBed.inject(PuenteDatosService) as jasmine.SpyObj<PuenteDatosService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});