import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RolldiceViewComponent } from './rolldice-view.component';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';
import { KeyControllerService } from '../../service/keyController/key-controller.service';

const mockActivatedRoute = {
  queryParams: of({ gameId: '1' })
};

const mockDashboardPublicityService = {
  getTopPublicityList: jasmine.createSpy('getTopPublicityList').and.returnValue([]),
  getBottomPublicityList: jasmine.createSpy('getBottomPublicityList').and.returnValue([])
};

const mockDashboardStyleService = {
  getImageBackgroundGameFile: jasmine.createSpy('getImageBackgroundGameFile').and.returnValue(''),
  get_color_text: jasmine.createSpy('get_color_text').and.returnValue('')
};

const mockAnimationGameService = {
  isRolling: false,
  finalTransformDice: '',
  rollTime: 0,
  startGameRolldice: jasmine.createSpy('startGameRolldice'),
  disabledPlayButton: false
};

const mockGameLogicService = {
  attempts: 0,
  winFirstTime: false,
  verifyGameCurrent: jasmine.createSpy('verifyGameCurrent').and.returnValue(Promise.resolve(null))
};

const mockGameCurrentSessionService = {
  updateGameId: jasmine.createSpy('updateGameId').and.returnValue(of({}))
};

const mockKeyControllerService = {
  code: '',
  clearCode: jasmine.createSpy('clearCode'),
  setCode: jasmine.createSpy('setCode')
};

describe('RolldiceViewComponent', () => {
  let component: RolldiceViewComponent;
  let fixture: ComponentFixture<RolldiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolldiceViewComponent ],
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DashboardPublicityService, useValue: mockDashboardPublicityService },
        { provide: DashboardStyleService, useValue: mockDashboardStyleService },
        { provide: AnimationGameService, useValue: mockAnimationGameService },
        { provide: GameLogicService, useValue: mockGameLogicService },
        { provide: GameCurrentSessionService, useValue: mockGameCurrentSessionService },
        { provide: KeyControllerService, useValue: mockKeyControllerService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolldiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
