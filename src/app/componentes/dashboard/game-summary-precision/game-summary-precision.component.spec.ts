import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSummaryPrecisionComponent } from './game-summary-precision.component';
import { of } from 'rxjs';
import { MatchService } from 'src/app/servicios/match/match.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

// Mocks de los servicios
const mockMatchService = jasmine.createSpyObj('MatchService', ['getMatchFilter']);
const mockTicketService = jasmine.createSpyObj('TicketService', ['getAll']);
const mockPuenteDatosService = jasmine.createSpyObj('PuenteDatosService', ['setMenu']);

describe('GameSummaryPrecisionComponent', () => {
  let component: GameSummaryPrecisionComponent;
  let fixture: ComponentFixture<GameSummaryPrecisionComponent>;

  // Configuración de los mocks
  beforeEach(async () => {
    // Mock de los métodos de los servicios
    mockMatchService.getMatchFilter.and.callFake((filter: string) => {
      if (filter.includes('win_match=true')) {
        return of({ key1: 'value1', key2: 'value2' }); // Mock de los ganadores
      } else if (filter.includes('win_match=false')) {
        return of({ key1: 'value1' }); // Mock de los perdedores
      }
      return of({});
    });

    mockTicketService.getAll.and.returnValue(of([{ id: 1 }, { id: 2 }, { id: 3 }])); // Mock de tickets

    await TestBed.configureTestingModule({
      declarations: [ GameSummaryPrecisionComponent ],
      providers: [
        { provide: MatchService, useValue: mockMatchService },
        { provide: TicketService, useValue: mockTicketService },
        { provide: PuenteDatosService, useValue: mockPuenteDatosService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryPrecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
