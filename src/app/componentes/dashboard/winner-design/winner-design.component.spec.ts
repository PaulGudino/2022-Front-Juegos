import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WinnerDesignComponent } from './winner-design.component';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';
import { of } from 'rxjs';

describe('WinnerDesignComponent', () => {
  let component: WinnerDesignComponent;
  let fixture: ComponentFixture<WinnerDesignComponent>;

  // Mocks de los servicios
  const mockPublicityService = {
    getPublicityTopList: jasmine.createSpy('getPublicityTopList').and.returnValue(of([])),
    getPublicityBottomList: jasmine.createSpy('getPublicityBottomList').and.returnValue(of([])),
  };

  const mockSnackbarService = {
    mensaje: jasmine.createSpy('mensaje'),
  };

  const mockDialogService = {
    open: jasmine.createSpy('open'),
    confirmed: jasmine.createSpy('confirmed').and.returnValue(of(true)),
  };

  const mockThemeService = {
    getDesignInformation: jasmine.createSpy('getDesignInformation').and.returnValue(of([{}])),
    updateDesgin: jasmine.createSpy('updateDesgin'),
  };

  const mockDashboardStyleService = {
    loadData: jasmine.createSpy('loadData'),
    get_image_winner: jasmine.createSpy('get_image_winner').and.returnValue(''),
    setImageWinnerGameFile: jasmine.createSpy('setImageWinnerGameFile'),
    getImageWinnerGameFile: jasmine.createSpy('getImageWinnerGameFile').and.returnValue({ name: 'test.png' }),
    get_image_logo_game: jasmine.createSpy('get_image_logo_game').and.returnValue(''),
    get_color_text: jasmine.createSpy('get_color_text').and.returnValue(''),
    get_image_machine_game: jasmine.createSpy('get_image_machine_game').and.returnValue(''),
  };

  const mockImageService = {
    captureFile: jasmine.createSpy('captureFile').and.returnValue(null),
    extraerBase64: jasmine.createSpy('extraerBase64').and.resolveTo({ base: '' }),
  };

  const mockPuenteDatosService = {
    setMenu: jasmine.createSpy('setMenu'),
  };

  const mockGameSelectionService = {
    selectedGame$: of(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importa HttpClientTestingModule
      declarations: [WinnerDesignComponent],
      providers: [
        { provide: PublicityService, useValue: mockPublicityService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: ConfirmDialogService, useValue: mockDialogService },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: DashboardStyleService, useValue: mockDashboardStyleService },
        { provide: ImageService, useValue: mockImageService },
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: GameSelectionService, useValue: mockGameSelectionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
