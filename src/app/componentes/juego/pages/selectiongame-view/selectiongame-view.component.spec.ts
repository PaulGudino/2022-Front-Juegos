import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule si lo necesitas
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { of } from 'rxjs'; // Importa of para crear observables

import { SelectiongameViewComponent } from './selectiongame-view.component';
import { GameService } from 'src/app/servicios/game/game.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';

const mockGameService = {
  getAll: () => of([]) // Devuelve un observable vacío para las pruebas
};

const mockTicketService = {
  // Define mocks para métodos del TicketService si es necesario
};

const mockGameLogicService = {
  // Define mocks para métodos del GameLogicService si es necesario
};

const mockDashboardPublicityService = {
  getTopPublicityList: () => [], // Devuelve un array vacío para las pruebas
  getBottomPublicityList: () => [] // Devuelve un array vacío para las pruebas
};

const mockDashboardStyleService = {
  get_image_logo: () => 'mockLogoUrl' // Añadido el método get_image_logo
};

const mockActivatedRoute = {
  queryParams: of({ gameId: 1 }) // Simula los parámetros de consulta
};

describe('SelectiongameViewComponent', () => {
  let component: SelectiongameViewComponent;
  let fixture: ComponentFixture<SelectiongameViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Añadir HttpClientTestingModule aquí
        FormsModule // Añadir FormsModule aquí si es necesario
      ],
      declarations: [ SelectiongameViewComponent ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: TicketService, useValue: mockTicketService },
        { provide: GameLogicService, useValue: mockGameLogicService },
        { provide: DashboardPublicityService, useValue: mockDashboardPublicityService },
        { provide: DashboardStyleService, useValue: mockDashboardStyleService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Proveer el mock para ActivatedRoute
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectiongameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más pruebas específicas aquí si es necesario
});
