import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/servicios/match/match.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

@Component({
  selector: 'app-game-summary-precision',
  templateUrl: './game-summary-precision.component.html',
  styleUrls: ['./game-summary-precision.component.css']
})
export class GameSummaryPrecisionComponent implements OnInit {

  total_tickets : number = 0;
  total_winners : number = 0;
  total_losers : number = 0;

  constructor(
    private staticData: PuenteDatosService,
    private ticketSrv: TicketService,
    private matchSrv : MatchService,
  ) { }

  ngOnInit(): void {
    this.staticData.setMenu('Precision');
    this.ticketSrv.getAll().subscribe(
      data =>{
        this.total_tickets = data.length
      }
    )
    this.matchSrv.getMatchFilter('?win_match=true').subscribe(
      (res) => {
         this.total_winners = Object.keys(res).length;
      }
    )
    this.matchSrv.getMatchFilter('?win_match=false').subscribe(
      res =>{
        this.total_losers = Object.keys(res).length;
      }
    )
  }

}