import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';
import { GameCurrentSession_Data } from 'src/app/interfaces/gameCurrentSession/gamecurrentsession_data';

@Component({
  selector: 'app-puertas-view',
  templateUrl: './puertas-view.component.html',
  styleUrls: ['./puertas-view.component.css']
})
export class PuertasViewComponent implements OnInit {
  backArrowEnabled: boolean = true;
  informationText: string = "A JUGAR!";
  slot_music = false;
  attemps = 3; // Número de intentos permitidos
  resultMessage = '';
  isOpening = false;
  isGameStarted = false;
  isDoorSelected = false; // Variable para controlar si una puerta ha sido seleccionada
  doors = [
    { isOpen: false, prize: 'Premio 1', image: '/assets/img/diseno_puerta.png' },
    { isOpen: false, prize: 'Premio 2', image: '/assets/img/diseno_puerta.png'  },
    { isOpen: false, prize: 'Premio 3', image: '/assets/img/diseno_puerta.png'  }
  ];

  gameId: number | undefined;
  gamecurrentsession: GameCurrentSession_Data | undefined;
  probability: any = {};
  currentDoor: number | null = null;
  finalTransform: string = 'rotateY(0deg)';
  openTime: number = 0;

  constructor(
    private router: Router,
    public publicity: DashboardPublicityService,
    public styles: DashboardStyleService,
    public animation: AnimationGameService,
    public theme: ThemeService,
    public publicityGame: PublicityGameService,
    public gameLogicService: GameLogicService,
    private probalilitySrv: ProbabilityService,
    private gameCurrentSessionService: GameCurrentSessionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.gameId = +params['gameId'];
      if (!this.gameId) {
        console.error('No gameId found in query params.');
      } else {
        this.loadGameData();
        this.updateGameIdForSession(this.gameId.toString());
        this.loadCurrentJuego(this.gameId.toString());
      }
    });
  }

  loadGameData(): void {
    console.log(`Game ID: ${this.gameId}`);
  }

  updateGameIdForSession(gameId: string): void {
    const kiosko_numero = '1';
    this.gameCurrentSessionService.updateGameId(kiosko_numero, gameId).subscribe(
      (response) => {
        console.log('Game ID updated successfully:', response);
      },
      (error) => {
        console.error('Error updating Game ID:', error);
      }
    );
  }

  async loadCurrentJuego(gameId: string) {
    try {
      const juegoSeleccionado = await this.gameLogicService.verifyGameCurrent(gameId);
      if (juegoSeleccionado) {
        this.gamecurrentsession = juegoSeleccionado;
        console.log('Detalle de Juego Actual:', this.gamecurrentsession);
      } else {
        console.error('No se encontró juego.');
      }
    } catch (error) {
      console.error('Error al cargar el juego:', error);
    }
  }

  startGame(): void {
    this.isGameStarted = true;
    this.isDoorSelected = false;
  }

  openDoor(index: number): void {
    if (this.isGameStarted && this.attemps > 0 && !this.doors[index].isOpen && !this.isOpening && !this.isDoorSelected) {
      this.isOpening = true;
      this.isDoorSelected = true;
      this.currentDoor = index;
      this.openTime = Math.random() * 1 + 1;
      
      setTimeout(() => {
        this.doors[index].isOpen = true;
        this.resultMessage = `¡Felicidades! Ganaste ${this.doors[index].prize}.`;
        this.attemps -= 1;
        this.isOpening = false;
        this.finalTransform = this.getTransform();
      }, this.openTime * 100);
    } else if (this.attemps <= 0) {
      this.resultMessage = "No tienes más intentos.";
    }
  }

  getTransform() {
    return 'rotateY(180deg)';
  }

  doSomething() {
    sessionStorage.removeItem("juego_puertas");
  }

  music() {
    if (this.attemps > 0) {
      this.slot_music = true;
      setTimeout(() => {
        this.slot_music = false;
      }, this.openTime * 10000);
    }
  }
}
