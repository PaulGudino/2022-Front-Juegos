import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule
import { PublicityComponent } from './publicity.component';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service'; // Asegúrate de importar el servicio necesario
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service'; // Asegúrate de importar SnackbarService
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service'; // Asegúrate de importar el servicio necesario
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service'; // Asegúrate de importar el servicio necesario
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service'; // Asegúrate de importar el servicio necesario
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service'; // Asegúrate de importar el servicio necesario

// Define mocks para los servicios si es necesario
const mockPublicityService = {
  getPublicityTopList: () => ({
    subscribe: (callback: Function) => callback([])
  }),
  getPublicityBottomList: () => ({
    subscribe: (callback: Function) => callback([])
  })
};

const mockSnackbarService = {
  // Define métodos mock según sea necesario
};

const mockDashboardPublicityService = {
  loadTopData: () => {},
  loadBottomData: () => {},
  getTopPublicityList: () => [],
  getBottomPublicityList: () => []
};

const mockConfirmDialogService = {
  // Define métodos mock según sea necesario
};

const mockPuenteDatosService = {
  setMenu: () => {}
};

const mockGameSelectionService = {
  selectedGame$: {
    subscribe: (callback: Function) => callback({})
  }
};

describe('PublicityComponent', () => {
  let component: PublicityComponent;
  let fixture: ComponentFixture<PublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Importa HttpClientTestingModule
        MatSnackBarModule, // Importa MatSnackBarModule
        MatToolbarModule, // Importa MatToolbarModule
        RouterTestingModule // Importa RouterTestingModule
      ],
      declarations: [ PublicityComponent ],
      providers: [
        { provide: PublicityService, useValue: mockPublicityService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: DashboardPublicityService, useValue: mockDashboardPublicityService },
        { provide: ConfirmDialogService, useValue: mockConfirmDialogService },
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: GameSelectionService, useValue: mockGameSelectionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
