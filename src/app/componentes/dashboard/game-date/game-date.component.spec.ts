import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameDateComponent } from './game-date.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameService } from './../../../servicios/game/game.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { AwardsConditionService } from './../../../servicios/awards-condition/awards-condition.service';
import { GameDateService } from './../../../servicios/game-date/game-date.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';

describe('GameDateComponent', () => {
  let component: GameDateComponent;
  let fixture: ComponentFixture<GameDateComponent>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;
  let confirmDialogService: jasmine.SpyObj<ConfirmDialogService>;
  let gameService: jasmine.SpyObj<GameService>;
  let puenteDatosService: jasmine.SpyObj<PuenteDatosService>;
  let awardsConditionService: jasmine.SpyObj<AwardsConditionService>;
  let gameDateService: jasmine.SpyObj<GameDateService>;
  let gameSelectionService: jasmine.SpyObj<GameSelectionService>;

  beforeEach(async () => {
    snackbarService = jasmine.createSpyObj('SnackbarService', ['mensaje']);
    confirmDialogService = jasmine.createSpyObj('ConfirmDialogService', ['open', 'confirmed']);
    gameService = jasmine.createSpyObj('GameService', ['getById', 'putGame']);
    puenteDatosService = jasmine.createSpyObj('PuenteDatosService', ['setMenu']);
    awardsConditionService = jasmine.createSpyObj('AwardsConditionService', ['getAwardConditionFilter']);
    gameDateService = jasmine.createSpyObj('GameDateService', ['DateFormat']);
    gameSelectionService = jasmine.createSpyObj('GameSelectionService', ['selectedGame$']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ GameDateComponent ],
      providers: [
        FormBuilder,
        { provide: SnackbarService, useValue: snackbarService },
        { provide: ConfirmDialogService, useValue: confirmDialogService },
        { provide: GameService, useValue: gameService },
        { provide: PuenteDatosService, useValue: puenteDatosService },
        { provide: AwardsConditionService, useValue: awardsConditionService },
        { provide: GameDateService, useValue: gameDateService },
        { provide: GameSelectionService, useValue: gameSelectionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
