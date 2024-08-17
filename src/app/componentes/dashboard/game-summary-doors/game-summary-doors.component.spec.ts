import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { GameSummaryDoorsComponent } from './game-summary-doors.component';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { MatchService } from 'src/app/servicios/match/match.service';

describe('GameSummaryDoorsComponent', () => {
  let component: GameSummaryDoorsComponent;
  let fixture: ComponentFixture<GameSummaryDoorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GameSummaryDoorsComponent ],
      providers: [
        { provide: PuenteDatosService, useValue: { setMenu: () => {} } },
        { provide: TicketService, useValue: { getAll: () => of([]) } },
        { provide: MatchService, useValue: { getMatchFilter: () => of([]) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
