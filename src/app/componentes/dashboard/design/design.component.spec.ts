import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DesignComponent } from './design.component';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Crear mocks para los servicios
class MockDashboardPublicityService {
  loadTopData() {}
  loadBottomData() {}
  getTopPublicityList() { return of([]); } // Añadido método
  getBottomPublicityList() { return of([]); } // Añadido método
}

class MockSnackbarService {
  mensaje() {}
}

class MockPublicityService {
  getPublicityTopList() { return of([]); }
  getPublicityBottomList() { return of([]); }
}

class MockThemeService {
  getDesignInformation() { return of([]); }
  updateDesgin() { return of(); }
}

class MockImageService {
  captureFile() { return new File([], 'filename'); }
  extraerBase64(file: File) { return Promise.resolve({ base: '' }); }
}

class MockConfirmDialogService {
  open() {}
  confirmed() { return of(true); }
}

class MockDashboardStyleService {
  loadData() {}
  get_image_machine_game() { return ''; }
  get_image_logo_game() { return ''; }
  get_font_letter() { return ''; }
  get_color_text() { return ''; }
  setImageMchineGameFile() {}
  setImageLogoFile() {}
  getImageMachineGameFile() { return new File([], 'filename'); }
  getImageLogoFile() { return new File([], 'filename'); }
}

class MockPublicityGameService {
  getPublicityGame(id: string) { return of({ image: '' }); }
}

class MockPuenteDatosService {
  setMenu() {}
}

// Configuración del TestBed
describe('DesignComponent', () => {
  let component: DesignComponent;
  let fixture: ComponentFixture<DesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignComponent ],
      providers: [
        { provide: DashboardPublicityService, useClass: MockDashboardPublicityService },
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: PublicityService, useClass: MockPublicityService },
        { provide: ThemeService, useClass: MockThemeService },
        { provide: ImageService, useClass: MockImageService },
        { provide: ConfirmDialogService, useClass: MockConfirmDialogService },
        { provide: DashboardStyleService, useClass: MockDashboardStyleService },
        { provide: PublicityGameService, useClass: MockPublicityGameService },
        { provide: PuenteDatosService, useClass: MockPuenteDatosService },
        { provide: Router, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
