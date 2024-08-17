import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignRolldiceComponent } from './design-rolldice.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

describe('DesignRolldiceComponent', () => {
  let component: DesignRolldiceComponent;
  let fixture: ComponentFixture<DesignRolldiceComponent>;

  const mockDashboardPublicityService = jasmine.createSpyObj('DashboardPublicityService', ['loadTopData', 'loadBottomData']);
  const mockPublicityService = jasmine.createSpyObj('PublicityService', ['getPublicityTopList', 'getPublicityBottomList']);
  const mockSnackbarService = jasmine.createSpyObj('SnackbarService', ['mensaje']);
  const mockConfirmDialogService = jasmine.createSpyObj('ConfirmDialogService', ['open', 'confirmed']);
  const mockThemeService = jasmine.createSpyObj('ThemeService', ['getDesignInformation', 'updateDesgin']);
  const mockImageService = jasmine.createSpyObj('ImageService', ['captureFile', 'extraerBase64']);
  const mockDashboardStyleService = jasmine.createSpyObj('DashboardStyleService', ['loadData', 'setImageMchineGameFile', 'setImageLogoFile', 'get_image_machine_game', 'get_image_logo_game', 'get_font_letter', 'get_color_text']);
  const mockPublicityGameService = jasmine.createSpyObj('PublicityGameService', ['getPublicityGame']);
  const mockPuenteDatosService = jasmine.createSpyObj('PuenteDatosService', ['setMenu']);

  // Mock implementations
  mockPublicityService.getPublicityTopList.and.returnValue(of([]));
  mockPublicityService.getPublicityBottomList.and.returnValue(of([]));
  mockThemeService.getDesignInformation.and.returnValue(of([{
    // Provide mock values for the properties used in the component
    get_image_machine_game: () => 'mock-image-machine',
    get_image_logo_game: () => 'mock-image-logo',
    get_font_letter: () => 'Arial',
    get_color_text: () => '#000000'
  }]));
  mockPublicityGameService.getPublicityGame.and.returnValue(of({ image: 'mock-url' }));
  mockPuenteDatosService.setMenu.and.returnValue();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignRolldiceComponent ],
      providers: [
        { provide: DashboardPublicityService, useValue: mockDashboardPublicityService },
        { provide: PublicityService, useValue: mockPublicityService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: ConfirmDialogService, useValue: mockConfirmDialogService },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: ImageService, useValue: mockImageService },
        { provide: DashboardStyleService, useValue: mockDashboardStyleService },
        { provide: PublicityGameService, useValue: mockPublicityGameService },
        { provide: PuenteDatosService, useValue: mockPuenteDatosService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignRolldiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
