import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"
import { DashboardPublicityService } from "../../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service"
import { DashboardStyleService } from "../../../../servicios/theme/dashboardStyle/dashboard-style.service"
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { KeyControllerService } from "../../service/keyController/key-controller.service"
import { TicketService } from 'src/app/servicios/ticket/ticket.service';	

@Component({
	selector: "app-scan-view",
	templateUrl: "./scan-view.component.html",
	styleUrls: ["./scan-view.component.css"],
})
export class ScanViewComponent implements OnInit {
	selectedInputCode: boolean = false
	scanState: boolean = true
	explication: String = "Puedes escanear el código QR de tu ticket"
	code: string = this.keyController.getCode()

	constructor(
		private router: Router,
		public publicity: DashboardPublicityService,
		public styles: DashboardStyleService,
		public keyController: KeyControllerService,
		private gameLogic: GameLogicService,
		private confirmDialog: ConfirmDialogService,
		private ticketService: TicketService
	) {}

	ngOnInit(): void {
		this.keyController.clearCode()
	}

	changeView() {
		this.scanState = false
		this.keyController.setCode("")
	}

	async continueToGame() {
		const qrCodeDigits = this.keyController.getCode();
    
		// Obtener el ticketId desde GameLogicService		
		if (this.keyController.getCode() != "") {
			let validateTicket = this.gameLogic.verifyTicket(this.keyController.getCode())
			if (await validateTicket) {
				this.gameLogic.playGame()
				sessionStorage.setItem("selection_game", "selection_game")
				this.router.navigate(["/juego/selection"])
			} else {
				let game_message = [
					"El ticket que ingresó no existe o ya fué reclamado, revise si la informacion ingresada es correcta",
					"Ó",
					"La fecha disponible del ticket está fuera del rango de disponibilidad del juego",
				]
				this.confirmDialog.error(game_message)
			}
		}else{
			let game_message = [
				"El ticket que ingresó no existe o ya fué reclamado, revise si la informacion ingresada es correcta",
				"Ó",
				"La fecha disponible del ticket está fuera del rango de disponibilidad del juego",
			]
			this.confirmDialog.error(game_message)
			this.keyController.clearCode();
		}
	}
	doSomething() {
		sessionStorage.removeItem("juego_scan")
	}
}
