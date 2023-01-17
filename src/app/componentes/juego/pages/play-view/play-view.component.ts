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

@Component({
	selector: "app-play-view",
	templateUrl: "./play-view.component.html",
	styleUrls: ["./play-view.component.css"],
})
export class PlayViewComponent implements OnInit {
	informationText: string = "A JUGAR!"
	slot_music = false

	audio = new Audio()
	audioArray: Audio[] = []

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
		private audioService: AudioService
	) {}

	async ngAfterViewInit(): Promise<void> {
		// this.audio.loop;
		this.audio.play()
	}

	ngOnInit(): void {
		this.audioService.getAll().subscribe((data) => {
			this.audioArray = data
			this.audio.src = this.audioArray[0].audio
			// console.log(this.audio.src);
		})
	}
	doSomething() {
		sessionStorage.removeItem("juego_play")
	}
	music() {
		if (this.gameLogicService.attempts >= 0) {
			console.log('Intentos:',this.gameLogicService.attempts)
			this.slot_music = true
		setTimeout(() => {
			this.slot_music = false
		}, 6000)
		}
	}
}
