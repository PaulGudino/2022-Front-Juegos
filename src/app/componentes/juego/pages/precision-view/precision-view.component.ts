import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { GameCurrentSessionService } from "src/app/servicios/gameCurrentSession/game-current-session.service"
import { GameCurrentSession_Data } from 'src/app/interfaces/gameCurrentSession/gamecurrentsession_data';
import { ActivatedRoute } from "@angular/router";
import { PublicityGame } from "src/app/interfaces/publicityGame/PublicityGame"
import { Audio } from "src/app/interfaces/audio/Audio"
import { AudioService } from "src/app/servicios/audio/audio.service"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"


@Component({
  selector: 'app-precision-view',
  templateUrl: './precision-view.component.html',
  styleUrls: ['./precision-view.component.css']
})
export class PrecisionViewComponent implements OnInit {
  gamecurrentsession: GameCurrentSession_Data | undefined; //juegoSeleccionado
  gameId: number | undefined; // Variable para almacenar game.id
  backArrowEnabled: boolean = true; //variable de flecha de retorno

  informationText: string = "A JUGAR!";
  slot_music = false;
  attemps = 0;
  currentMinutes = 0;
  clockRunning = false;
  intervalId: any;
  currentTime = '00:00';
  resultMessage = '';
  targetTime = '';

  probability: any = {};

  prizes: string[] = ["Premio 1", "Premio 2", "Premio 3", "Premio 4", "Premio 5"];


  constructor(
    private router: Router,
    private route: ActivatedRoute, // Inyectar ActivatedRoute
    public publicity: DashboardPublicityService,
    public styles: DashboardStyleService,
    public animation: AnimationGameService,
    public theme: ThemeService,
    public publicityGame: PublicityGameService,
    public gameLogicService: GameLogicService,
    private probalilitySrv: ProbabilityService,
    private gameCurrentSessionService: GameCurrentSessionService
  ) {}

  ngOnInit(): void {
    this.targetTime = this.generateRandomTime();
    this.route.queryParams.subscribe(params => {
			this.gameId = +params['gameId']; // Convertir el parámetro a número
			if (!this.gameId) {
				console.error('No gameId found in query params.');
			} else {
				// Llama a cualquier función que necesite usar gameId aquí, si es necesario
				this.loadGameData();
				this.updateGameIdForSession(this.gameId.toString());
				this.loadCurrentJuego(this.gameId.toString());//el 1 representa la MAQUINA 1
			}
		});

   /*  this.probalilitySrv.getProbabilites().subscribe(
      (data: any) => {
        this.attemps = data.attempts_limit;
        
      }
    ); */   

  }

    //Funciones usadas en el transcurso del Juego
	loadGameData(): void {
		// Aquí puedes cargar datos relacionados con gameId si es necesario
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
			console.error('No se encontró juego .');
		  }
		} catch (error) {
		  console.error('Error al cargar el juego :', error);
		}
	}

  
  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  generateRandomTime(): string {
    const randomMinutes = Math.floor(Math.random() * (24 * 60));
    return this.formatTime(randomMinutes);
  }

  startClock(): void {
    this.backArrowEnabled = false;
    this.currentMinutes = 0;
    this.clockRunning = true;
    this.currentTime = this.formatTime(this.currentMinutes);
    this.intervalId = setInterval(() => {
      this.currentMinutes = (this.currentMinutes + 1) % (24 * 60);
      this.currentTime = this.formatTime(this.currentMinutes);
    }, 1);
  }

  stopClock(): void {
    clearInterval(this.intervalId);
    this.clockRunning = false;
    const currentTime = this.formatTime(this.currentMinutes);
    if (currentTime === this.targetTime) {
      const prize = this.prizes[Math.floor(Math.random() * this.prizes.length)];
      this.resultMessage = `¡Felicidades! Ganaste ${prize}.`;
    } else {
      this.resultMessage = `Lo siento, no coincidieron. La hora objetivo era ${this.targetTime}. Intenta de nuevo.`;
    }
  }

  
  doSomething() {
    sessionStorage.removeItem("juego_precision");
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