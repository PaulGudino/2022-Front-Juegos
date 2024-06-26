import { Component, OnInit } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { Router } from '@angular/router';
import { GameCurrentSessionService } from "src/app/servicios/gameCurrentSession/game-current-session.service"
import { GameCurrentSession_Data } from 'src/app/interfaces/gameCurrentSession/gamecurrentsession_data';
import { ActivatedRoute } from "@angular/router"; // Importar ActivatedRoute
import { PublicityGame } from "src/app/interfaces/publicityGame/PublicityGame"
import { Audio } from "src/app/interfaces/audio/Audio"
import { AudioService } from "src/app/servicios/audio/audio.service"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"



@Component({
	selector: 'app-rolldice-view',
	templateUrl: './rolldice-view.component.html',
	styleUrls: ['./rolldice-view.component.css']
})
export class RolldiceViewComponent implements OnInit {
	gamecurrentsession: GameCurrentSession_Data | undefined; //juegoSeleccionado
	gameId: number | undefined; // Variable para almacenar game.id


	informationText: string = "A JUGAR!"
	slot_music = false
	attemps = 0
	isRolling = false;
	images: string[] = [
		'./assets/dice/cara1.jpg', 
		'./assets/dice/cara2.jpg', 
		'./assets/dice/cara3.jpg', 
		'./assets/dice/cara4.jpg', 
		'./assets/dice/cara5.jpg', 
		'./assets/dice/cara6.jpg'];


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
		private route: ActivatedRoute,
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


	doSomething() {
		sessionStorage.removeItem("juego_rolldice")
	}
	music() {
		if (this.attemps > 0) {
			this.slot_music = true
			this.attemps -= 1
			setTimeout(() => {
				this.slot_music = false
			}, 7000)
		}
	}

	currentFace: number = 1;
  	finalTransform: string = 'rotateX(0deg) rotateY(0deg)';
  	rollTime: number = 0;
	
	  rollDice() {
		this.isRolling = true;
		const randomFace = Math.floor(Math.random() * 6) + 1;
		this.currentFace = randomFace;
	
		// Tiempo aleatorio entre 5 y 10 segundos
		this.rollTime = Math.random() * 5 + 5;
	
		setTimeout(() => {
		  this.isRolling = false;
		  this.finalTransform = this.getTransform();
		  console.log(`Cara final: ${this.currentFace}`);
		}, this.rollTime * 1000);  // Convertir a milisegundos
	  }
	
	  getTransform() {
		switch (this.currentFace) {
		  case 1: return 'rotateX(0deg) rotateY(0deg)';
		  case 2: return 'rotateX(0deg) rotateY(180deg)';
		  case 3: return 'rotateX(-90deg) rotateY(0deg)';
		  case 4: return 'rotateX(90deg) rotateY(0deg)';
		  case 5: return 'rotateX(0deg) rotateY(90deg)';
		  case 6: return 'rotateX(0deg) rotateY(-90deg)';
		  default: return 'rotateX(0deg) rotateY(0deg)';
		}
	  }
	
	  onFileSelected(event: any, index: number) {
		const file = event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = () => {
			this.images[index] = reader.result as string;
		  };
		  reader.readAsDataURL(file);
		}
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


}