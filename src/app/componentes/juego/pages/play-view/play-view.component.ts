import { GameLogicService } from "./../../service/gameLogic/game-logic.service"
import { Component, Input, OnInit } from "@angular/core"
import { DashboardPublicityService } from "../../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service"

import { DashboardStyleService } from "../../../../servicios/theme/dashboardStyle/dashboard-style.service"
import { ProbabilityService } from "../../../../servicios/probability/probability/probability.service"
import { AnimationGameService } from "../../service/animationGame/animation-game.service"

import { ThemeService } from "../../service/theme/theme.service"
import { PublicityGameService } from "src/app/servicios/publicityGame/publicity-game.service"
import { PublicityGame } from "src/app/interfaces/publicityGame/PublicityGame"

import { Audio } from "src/app/interfaces/audio/Audio"
import { AudioService } from "src/app/servicios/audio/audio.service"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"
import { ActivatedRoute } from "@angular/router"; // Importar ActivatedRoute
import { GameCurrentSessionService } from "src/app/servicios/gameCurrentSession/game-current-session.service"
import { GameCurrentSession_Data } from 'src/app/interfaces/gameCurrentSession/gamecurrentsession_data';


@Component({
	selector: "app-play-view",
	templateUrl: "./play-view.component.html",
	styleUrls: ["./play-view.component.css"],
})
export class PlayViewComponent {
	backArrowEnabled: boolean = true; //variable de flecha de retorno
	informationText: string = "A JUGAR!"
	slot_music = false
	attemps = 0
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
		public publicity: DashboardPublicityService,
		public styles: DashboardStyleService,
		public animation: AnimationGameService,
		public theme: ThemeService,
		public publicityGame: PublicityGameService,
		public gameLogicService: GameLogicService,
		private probalilitySrv: ProbabilityService,
		private route: ActivatedRoute, // Inyectar ActivatedRoute
		private gameCurrentSessionService: GameCurrentSessionService

	) { }

	// async ngAfterViewInit(): Promise<void> {
	// 	// this.audio.loop;
	// 	this.audio.play()
	// }

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
			this.attemps = this.gameLogicService.attempts;
			console.log('Detalle de Juego Actual:', this.gamecurrentsession);
		  } else {
			console.error('No se encontró juego .');
		  }
		} catch (error) {
		  console.error('Error al cargar el juego :', error);
		}
	  }


	doSomething() {
		sessionStorage.removeItem("juego_play");
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
