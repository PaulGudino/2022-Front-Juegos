import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSummaryComponent } from './game-summary.component';
import { of } from 'rxjs';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { MatchService } from 'src/app/servicios/match/match.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

describe('GameSummaryComponent', () => {
  let component: GameSummaryComponent;
  let fixture: ComponentFixture<GameSummaryComponent>;

  let mockPuenteDatosService = {
    setMenu: jasmine.createSpy('setMenu')
  };

  let mockTicketService = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([]))
  };

  let mockMatchService = {
    getMatchFilter: jasmine.createSpy('getMatchFilter').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: TicketService, useValue: mockTicketService },
        { provide: MatchService, useValue: mockMatchService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});