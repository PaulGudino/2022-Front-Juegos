import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; // Importa 'of' para crear observables simulados

import { GameSummaryRolldiceComponent } from './game-summary-rolldice.component';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { MatchService } from 'src/app/servicios/match/match.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

describe('GameSummaryRolldiceComponent', () => {
  let component: GameSummaryRolldiceComponent;
  let fixture: ComponentFixture<GameSummaryRolldiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryRolldiceComponent ],
      providers: [
        { provide: TicketService, useValue: { getAll: () => of([{ id: 1 }, { id: 2 }]) } }, // Simulación del método 'getAll'
        { provide: MatchService, useValue: { getMatchFilter: (query: string) => of(query.includes('true') ? { '1': {}, '2': {} } : { '1': {} }) } }, // Simulación del método 'getMatchFilter'
        { provide: PuenteDatosService, useValue: { setMenu: () => {} } } // Simulación del método 'setMenu'
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryRolldiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
