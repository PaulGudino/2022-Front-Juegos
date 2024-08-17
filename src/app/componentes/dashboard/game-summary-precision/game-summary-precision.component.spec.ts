import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSummaryPrecisionComponent } from './game-summary-precision.component';
import { of } from 'rxjs';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// Mocks de los servicios
const mockMatchService = jasmine.createSpyObj('MatchService', ['getMatchFilter']);
const mockTicketService = jasmine.createSpyObj('TicketService', ['getAll']);
const mockPuenteDatosService = jasmine.createSpyObj('PuenteDatosService', ['setMenu']);

describe('GameSummaryPrecisionComponent', () => {
  let component: GameSummaryPrecisionComponent;
  let fixture: ComponentFixture<GameSummaryPrecisionComponent>;

  let mockPuenteDatosService = {
    setMenu: jasmine.createSpy('setMenu')
  };

  let mockGameCurrentSessionService = {
    getFilter: jasmine.createSpy('getFilter').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryPrecisionComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: GameCurrentSessionService, useValue: mockGameCurrentSessionService }
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
