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
import { KeyControllerService } from '../../service/keyController/key-controller.service';
import { GameCurrentSession_Data } from 'src/app/interfaces/gameCurrentSession/gamecurrentsession_data';

@Component({
  selector: 'app-rolldice-view',
  templateUrl: './rolldice-view.component.html',
  styleUrls: ['./rolldice-view.component.css']
})
export class RolldiceViewComponent implements OnInit {
  
  backArrowEnabled: boolean = true;
  gamecurrentsession: GameCurrentSession_Data | undefined;
  gameId: number | undefined;
  informationText: string = "A JUGAR!";
  slot_music = false;
  attemps = 0;
  isRolling = false;
  
  scanState: boolean = true;
  probability: any = {};
  currentFace: number = 1;
  finalTransform: string = 'rotateX(0deg) rotateY(0deg)';
  rollTime: number = 0;

  constructor(
    private router: Router,
    public keyController: KeyControllerService,
    public publicity: DashboardPublicityService,
    public styles: DashboardStyleService,
    public animation: AnimationGameService,
    public theme: ThemeService,
    public publicityGame: PublicityGameService,
    public gameLogicService: GameLogicService,
    private probalilitySrv: ProbabilityService,
    private route: ActivatedRoute,
    private gameCurrentSessionService: GameCurrentSessionService
  ) { }

  ngOnInit(): void {
    this.keyController.clearCode();
    this.changeView()
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

  changeView() {
    this.scanState = false;
    this.keyController.setCode("");
  }

  validateInput(event: any): void {
    const input = event.target;
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
      this.keyController.code = input.value; // Actualiza el modelo si es necesario
    }
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
        this.attemps = this.gameLogicService.attempts;
        console.log('Detalle de Juego Actual:', this.gamecurrentsession);
      } else {
        console.error('No se encontró juego.');
      }
    } catch (error) {
      console.error('Error al cargar el juego:', error);
    }
  }
  music() {
    if (this.attemps > 0) {
        this.slot_music = true;
        this.attemps -= 1;
        setTimeout(() => {
            this.slot_music = false;
        }, this.animation.rollTime * 1000);
    }
  }
  doSomething() {
    sessionStorage.removeItem("juego_rolldice");
  }
}
