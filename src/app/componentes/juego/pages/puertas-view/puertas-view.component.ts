import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';

@Component({
  selector: 'app-puertas-view',
  templateUrl: './puertas-view.component.html',
  styleUrls: ['./puertas-view.component.css']
})
export class PuertasViewComponent implements OnInit {

  informationText: string = "A JUGAR!";
  slot_music = false;
  attemps = 0;
  resultMessage = '';
  doors = [
    { isOpen: false, prize: 'Premio 1' },
    { isOpen: false, prize: 'Premio 2' },
    { isOpen: false, prize: 'Premio 3' }
  ];

  // audio = new Audio()
  // audioArray: Audio[] = []

  probability: any = {
    // id: 1,
    // porcent_win: 20,
    // winners_limit: 1,
    // attempts_limit: 1,
    // created: "2022-11-29T14:47:30.056806",
    // modified: "2022-11-29T14:47:30.056806",
    // is_active: true,
    // game_id: 1
  }

  constructor(
    private router: Router,
    public publicity: DashboardPublicityService,
    public styles: DashboardStyleService,
    public animation: AnimationGameService,
    public theme: ThemeService,
    public publicityGame: PublicityGameService,
    public gameLogicService: GameLogicService,
    private probalilitySrv: ProbabilityService
  ) {}

  ngOnInit(): void {
    this.probalilitySrv.getProbabilites().subscribe(
      (data: any) => {
        this.attemps = data.attempts_limit;
      }
    );
  }

  openDoor(index: number): void {
    if (this.attemps > 0 && !this.doors[index].isOpen) {
      this.doors[index].isOpen = true;
      this.resultMessage = `¡Felicidades! Ganaste ${this.doors[index].prize}.`;
      this.attemps -= 1;
    } else if (this.attemps <= 0) {
      this.resultMessage = "No tienes más intentos.";
    }
  }

  doSomething() {
    sessionStorage.removeItem("juego_puertas");
  }
  
  music() {
    if (this.attemps > 0) {
      this.slot_music = true;
      this.attemps -= 1;
      setTimeout(() => {
        this.slot_music = false;
      }, 7000);
    }
  }
}
