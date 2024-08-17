import { Component, OnInit } from '@angular/core';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';

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
    private gameCurrentSession : GameCurrentSessionService,
  ) { }

  ngOnInit(): void {
    this.staticData.setMenu('Precision');
    this.gameCurrentSession.getFilter('?id=&game_id=2').subscribe(
      (data: any) => {
        this.total_tickets = Object.keys(data).length;

      }
    )
    this.gameCurrentSession.getFilter('?id=&game_id=2&gano=true').subscribe(
      (data: any) => {
        this.total_winners = Object.keys(data).length;

      }
    )
    this.gameCurrentSession.getFilter('?id=&game_id=2&gano=false').subscribe(
      (data: any) => {
        this.total_losers = Object.keys(data).length;
      }
    )
  }

}