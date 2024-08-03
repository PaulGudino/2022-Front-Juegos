import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayViewComponent } from './play-view.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardPublicityService } from '../../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from '../../../../servicios/theme/dashboardStyle/dashboard-style.service';
import { ProbabilityService } from '../../../../servicios/probability/probability/probability.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { AudioService } from 'src/app/servicios/audio/audio.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameLogicService } from './../../service/gameLogic/game-logic.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';

describe('PlayViewComponent', () => {
  let component: PlayViewComponent;
  let fixture: ComponentFixture<PlayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayViewComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { 
          provide: DashboardPublicityService, 
          useValue: {
            getTopPublicityList: () => of([]),
            getBottomPublicityList: () => of([])
          }
        },
        { 
          provide: DashboardStyleService, 
          useValue: {
            get_image_logo_game: () => 'mocked-logo-url', // Mock para get_image_logo_game
            get_image_machine_game: () => 'mocked-machine-image-url' // Mock para get_image_machine_game
          }
        },
        { 
          provide: ProbabilityService, 
          useValue: {} 
        },
        { 
          provide: AnimationGameService, 
          useValue: {} 
        },
        { 
          provide: ThemeService, 
          useValue: {} 
        },
        { 
          provide: PublicityGameService, 
          useValue: {} 
        },
        { 
          provide: AudioService, 
          useValue: {} 
        },
        { 
          provide: ConfirmDialogService, 
          useValue: {} 
        },
        { 
          provide: GameLogicService, 
          useValue: {
            verifyGameCurrent: () => Promise.resolve({}) // Mock para verifyGameCurrent
          }
        },
        { 
          provide: GameCurrentSessionService, 
          useValue: {
            updateGameId: () => of({}) // Mock para updateGameId
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ gameId: '1' }) // Mock para ActivatedRoute
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
