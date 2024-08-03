import { TestBed } from '@angular/core/testing';
import { PuenteDatosService } from './puente-datos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { GameSelectionService } from '../game-selection/game-selection.service';
import { Menu } from 'src/app/interfaces/menu';

describe('PuenteDatosService', () => {
  let service: PuenteDatosService;
  let httpMock: HttpTestingController;
  let gameSelectionServiceSpy: jasmine.SpyObj<GameSelectionService>;

  beforeEach(() => {
    // Crear un spy para el servicio GameSelectionService
    const spy = jasmine.createSpyObj('GameSelectionService', ['selectedGame$']);
    const selectedGameSubject = new Subject<string>();
    spy.selectedGame$ = selectedGameSubject.asObservable();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PuenteDatosService,
        { provide: GameSelectionService, useValue: spy }
      ]
    });

    service = TestBed.inject(PuenteDatosService);
    httpMock = TestBed.inject(HttpTestingController);
    gameSelectionServiceSpy = TestBed.inject(GameSelectionService) as jasmine.SpyObj<GameSelectionService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
