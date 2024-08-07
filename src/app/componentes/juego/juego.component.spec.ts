import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JuegoComponent } from './juego.component';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { GameLogicService } from './service/gameLogic/game-logic.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { AudioService } from 'src/app/servicios/audio/audio.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';

describe('JuegoComponent', () => {
  let component: JuegoComponent;
  let fixture: ComponentFixture<JuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule // Habilita las animaciones
      ],
      declarations: [ JuegoComponent ],
      providers: [
        AwardsService,
        GameLogicService,
        GameService,
        AuthService,
        DashboardStyleService,
        DashboardPublicityService,
        PublicityService,
        ConfirmDialogService,
        AudioService,
        ThemeService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
