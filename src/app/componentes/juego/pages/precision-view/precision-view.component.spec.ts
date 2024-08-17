import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

import { PrecisionViewComponent } from './precision-view.component';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';

const mockActivatedRoute = {
  queryParams: of({ gameId: '1' })
};

const mockDashboardPublicityService = {
  getTopPublicityList: jasmine.createSpy('getTopPublicityList').and.returnValue([]),
  getBottomPublicityList: jasmine.createSpy('getBottomPublicityList').and.returnValue([])
};

const mockDashboardStyleService = {
  get_image_logo_game: jasmine.createSpy('get_image_logo_game').and.returnValue(''),
  get_color_text: jasmine.createSpy('get_color_text').and.returnValue(''),
  get_image_background_precision: jasmine.createSpy('get_image_background_precision').and.returnValue(''),
  get_image_logo_precision: jasmine.createSpy('get_image_logo_precision').and.returnValue(''),
  get_image_box_watch: jasmine.createSpy('get_image_box_watch').and.returnValue('') // Añadir esta línea
};

const mockAnimationGameService = {
  InitialTime: jasmine.createSpy('InitialTime'),
  startClock: jasmine.createSpy('startClock'),
  stopClock: jasmine.createSpy('stopClock'),
  targetTime: '00:00',
  currentTime: '00:00',
  clockRunning: false
};

const mockGameLogicService = {
  attempts: 0,
  winFirstTime: false,
  verifyGameCurrent: jasmine.createSpy('verifyGameCurrent').and.returnValue(Promise.resolve(null))
};

const mockGameCurrentSessionService = {
  updateGameId: jasmine.createSpy('updateGameId').and.returnValue(of({}))
};

const mockProbabilityService = {
  getProbabilites: jasmine.createSpy('getProbabilites').and.returnValue(of({ attempts_limit: 0 }))
};

describe('PrecisionViewComponent', () => {
  let component: PrecisionViewComponent;
  let fixture: ComponentFixture<PrecisionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], // Añadir HttpClientTestingModule aquí
      declarations: [ PrecisionViewComponent ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DashboardPublicityService, useValue: mockDashboardPublicityService },
        { provide: DashboardStyleService, useValue: mockDashboardStyleService },
        { provide: AnimationGameService, useValue: mockAnimationGameService },
        { provide: GameLogicService, useValue: mockGameLogicService },
        { provide: GameCurrentSessionService, useValue: mockGameCurrentSessionService },
        { provide: ProbabilityService, useValue: mockProbabilityService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecisionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
