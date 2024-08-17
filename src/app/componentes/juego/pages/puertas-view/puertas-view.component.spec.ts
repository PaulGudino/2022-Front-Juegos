import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuertasViewComponent } from './puertas-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Mock services
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';

describe('PuertasViewComponent', () => {
  let component: PuertasViewComponent;
  let fixture: ComponentFixture<PuertasViewComponent>;

  let mockActivatedRoute = {
    queryParams: of({ gameId: '1' })
  };

  let mockDashboardPublicityService = {
    getTopPublicityList: jasmine.createSpy('getTopPublicityList').and.returnValue(of([])),
    getBottomPublicityList: jasmine.createSpy('getBottomPublicityList').and.returnValue(of([]))
  };

  let mockDashboardStyleService = {
    get_image_logo_game: jasmine.createSpy('get_image_logo_game').and.returnValue('mock-image-url'),
    get_image_background_puertas: jasmine.createSpy('get_image_background_puertas').and.returnValue('mock-background-url'),
    get_image_logo_puertas: jasmine.createSpy('get_image_logo_puertas').and.returnValue('mock-logo-url') // Añadir esta línea
  };

  let mockAnimationGameService = {
    closeDoors: jasmine.createSpy('closeDoors'),
    getPrizes: jasmine.createSpy('getPrizes'),
    openTime: 2
  };
  
  let mockThemeService = {};
  let mockPublicityGameService = {};
  let mockGameLogicService = {
    verifyGameCurrent: jasmine.createSpy('verifyGameCurrent').and.returnValue(Promise.resolve({})),
    attempts: 3
  };
  let mockProbabilityService = {};
  let mockGameCurrentSessionService = {
    updateGameId: jasmine.createSpy('updateGameId').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuertasViewComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DashboardPublicityService, useValue: mockDashboardPublicityService },
        { provide: DashboardStyleService, useValue: mockDashboardStyleService },
        { provide: AnimationGameService, useValue: mockAnimationGameService },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: PublicityGameService, useValue: mockPublicityGameService },
        { provide: GameLogicService, useValue: mockGameLogicService },
        { provide: ProbabilityService, useValue: mockProbabilityService },
        { provide: GameCurrentSessionService, useValue: mockGameCurrentSessionService },
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get', 'post']) },
        { provide: TicketService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuertasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
