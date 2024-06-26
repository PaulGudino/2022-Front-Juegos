import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';

//Servicios para generalizar el juego
import { GameCurrentSessionService } from "src/app/servicios/gameCurrentSession/game-current-session.service"
import { GameCurrentSession_Data } from 'src/app/interfaces/gameCurrentSession/gamecurrentsession_data';
import { ActivatedRoute } from "@angular/router"; // Importar ActivatedRoute
import { PublicityGame } from "src/app/interfaces/publicityGame/PublicityGame"
import { Audio } from "src/app/interfaces/audio/Audio"
import { AudioService } from "src/app/servicios/audio/audio.service"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"





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

  gameId: number | undefined; // Variable para almacenar game.id
	gamecurrentsession: GameCurrentSession_Data | undefined;
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
    private probalilitySrv: ProbabilityService,
    private gameCurrentSessionService: GameCurrentSessionService,
    private route: ActivatedRoute, // Inyectar ActivatedRoute
  ) {}

  ngOnInit(): void {
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

/*     this.probalilitySrv.getProbabilites().subscribe(
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
