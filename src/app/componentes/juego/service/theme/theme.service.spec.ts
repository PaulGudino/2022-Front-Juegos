import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThemeService } from './theme.service';
import { PuenteDatosService } from '../../../../servicios/comunicacio_componentes/puente-datos.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { PublicityGame } from 'src/app/interfaces/publicityGame/PublicityGame';
import { of } from 'rxjs';

describe('ThemeService', () => {
  let service: ThemeService;
  let httpMock: HttpTestingController;
  let puenteDatosServiceSpy: jasmine.SpyObj<PuenteDatosService>;
  let publicityGameServiceSpy: jasmine.SpyObj<PublicityGameService>;

  beforeEach(() => {
    const puenteSpy = jasmine.createSpyObj('PuenteDatosService', ['geturl']);
    puenteSpy.geturl.and.returnValue('http://localhost:8000/');

    const publicitySpy = jasmine.createSpyObj('PublicityGameService', ['getAllPublicityGame']);
    publicitySpy.getAllPublicityGame.and.returnValue(of([])); // Return an observable of empty array

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ThemeService,
        { provide: PuenteDatosService, useValue: puenteSpy },
        { provide: PublicityGameService, useValue: publicitySpy }
      ]
    });

    service = TestBed.inject(ThemeService);
    httpMock = TestBed.inject(HttpTestingController);
    puenteDatosServiceSpy = TestBed.inject(PuenteDatosService) as jasmine.SpyObj<PuenteDatosService>;
    publicityGameServiceSpy = TestBed.inject(PublicityGameService) as jasmine.SpyObj<PublicityGameService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
