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

@Component({
	selector: "app-play-view",
	templateUrl: "./play-view.component.html",
	styleUrls: ["./play-view.component.css"],
})
export class PlayViewComponent {
	informationText: string = "A JUGAR!"
	slot_music = false
	attemps = 0

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
		private probalilitySrv : ProbabilityService

	) {}

	// async ngAfterViewInit(): Promise<void> {
	// 	// this.audio.loop;
	// 	this.audio.play()
	// }

	ngOnInit(): void {
		this.probalilitySrv.getProbabilites().subscribe(
			(data:any)=>{
				this.attemps = data.attempts_limit
			}
		)
	}
	doSomething() {
		sessionStorage.removeItem("juego_play")
	}
	music() {
		console.log(this.attemps)
		if (this.attemps > 0) {
			this.slot_music = true
			this.attemps -=1
			setTimeout(() => {
				this.slot_music = false
			}, 7000)
		}
	}
}
