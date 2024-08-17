import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/servicios/match/match.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';


@Component({
  selector: 'app-game-summary-doors',
  templateUrl: './game-summary-doors.component.html',
  styleUrls: ['./game-summary-doors.component.css']
})
export class GameSummaryDoorsComponent implements OnInit {

  total_tickets : number = 0;
  total_winners : number = 0;
  total_losers : number = 0;

  constructor(
    private staticData: PuenteDatosService,
    private gameCurrentSession : GameCurrentSessionService,
  ) { }

  ngOnInit(): void {
    this.staticData.setMenu('Puertas');
    this.gameCurrentSession.getFilter('?id=&game_id=4').subscribe(
      (data: any) => {
        this.total_tickets = Object.keys(data).length;

      }
    )
    this.gameCurrentSession.getFilter('?id=&game_id=4&gano=true').subscribe(
      (data: any) => {
        this.total_winners = Object.keys(data).length;

      }
    )
    this.gameCurrentSession.getFilter('?id=&game_id=4&gano=false').subscribe(
      (data: any) => {
        this.total_losers = Object.keys(data).length;

      }
    )
  }

}

  


