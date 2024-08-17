import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SaveScreenComponent } from './save-screen.component';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

describe('SaveScreenComponent', () => {
  let component: SaveScreenComponent;
  let fixture: ComponentFixture<SaveScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatToolbarModule],
      declarations: [ SaveScreenComponent ],
      providers: [
        { provide: DashboardPublicityService, useValue: { loadTopData: () => {}, getTopPublicityList: () => of([]), getBottomPublicityList: () => of([]) } },
        { provide: SnackbarService, useValue: { mensaje: () => {} } },
        { provide: PublicityService, useValue: { getPublicityTopList: () => of([]), getPublicityBottomList: () => of([]) } },
        { provide: ThemeService, useValue: { getDesignInformation: () => of([]), updateDesgin: () => of({}) } },
        { provide: ImageService, useValue: { captureVideoFile: () => new File([], ''), extraerBase64: () => Promise.resolve({ base: '' }) } },
        { provide: ConfirmDialogService, useValue: { open: () => {}, confirmed: () => of(true) } },
        { provide: DashboardStyleService, useValue: { getVideoScreensaverFile: () => new File([], ''), get_title_button_screensaver: () => '', get_video_screensaver: () => '', setVideoScreensaverFile: () => {}, get_color_background_game: () => '', get_color_text: () => '', get_title_winner: () => '', get_description_winner: () => '' } },
        { provide: GameSelectionService, useValue: { selectedGame$: of('') } },
        { provide: PuenteDatosService, useValue: { setMenu: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
