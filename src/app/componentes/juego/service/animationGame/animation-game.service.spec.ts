import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnimationGameService } from './animation-game.service';
import { GameLogicService } from './../gameLogic/game-logic.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { KeyControllerService } from '../keyController/key-controller.service';

describe('AnimationGameService', () => {
  let service: AnimationGameService;
  let gameLogicService: jasmine.SpyObj<GameLogicService>;
  let confirmDialogService: jasmine.SpyObj<ConfirmDialogService>;
  let keyControllerService: jasmine.SpyObj<KeyControllerService>;

  beforeEach(() => {
    const gameLogicSpy = jasmine.createSpyObj('GameLogicService', ['setWinnerState', 'decreaseAttemptCount']);
    const confirmDialogSpy = jasmine.createSpyObj('ConfirmDialogService', ['result_game', 'end_game']);
    const keyControllerSpy = jasmine.createSpyObj('KeyControllerService', ['getCode']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas de HttpClient
      providers: [
        AnimationGameService,
        { provide: GameLogicService, useValue: gameLogicSpy },
        { provide: ConfirmDialogService, useValue: confirmDialogSpy },
        { provide: KeyControllerService, useValue: keyControllerSpy }
      ]
    });

    service = TestBed.inject(AnimationGameService);
    gameLogicService = TestBed.inject(GameLogicService) as jasmine.SpyObj<GameLogicService>;
    confirmDialogService = TestBed.inject(ConfirmDialogService) as jasmine.SpyObj<ConfirmDialogService>;
    keyControllerService = TestBed.inject(KeyControllerService) as jasmine.SpyObj<KeyControllerService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
