import { TestBed } from '@angular/core/testing';
import { TicketConfigurationService } from './ticket-configuration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

describe('TicketConfigurationService', () => {
  let service: TicketConfigurationService;
  let httpMock: HttpTestingController;
  let puenteService: jasmine.SpyObj<PuenteDatosService>;

  beforeEach(() => {
    const puenteSpy = jasmine.createSpyObj('PuenteDatosService', ['geturl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TicketConfigurationService,
        { provide: PuenteDatosService, useValue: puenteSpy }
      ]
    });

    service = TestBed.inject(TicketConfigurationService);
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