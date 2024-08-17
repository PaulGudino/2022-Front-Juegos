import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"
import { DashboardPublicityService } from "../../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service"
import { DashboardStyleService } from "../../../../servicios/theme/dashboardStyle/dashboard-style.service"
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { KeyControllerService } from "../../service/keyController/key-controller.service"
import { TicketService } from 'src/app/servicios/ticket/ticket.service';	
import { ThemeService } from "src/app/servicios/theme/theme.service"

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
	image_background?: string = "";

	intents = 0;
	constructor(
		private router: Router,
		public publicity: DashboardPublicityService,
		public styles: DashboardStyleService,
		public keyController: KeyControllerService,
		private gameLogic: GameLogicService,
		private confirmDialog: ConfirmDialogService,
		private ticketService: TicketService,
		private theme: ThemeService,
	) {}

	ngOnInit(): void {
		this.keyController.clearCode()
		this.theme.getDesignInformation().subscribe((designData) => {
			this.styles.loadData(designData[0]);
		  });
	}

	changeView() {
		this.scanState = false
		this.keyController.setCode("")
	}

	async continueToGame() {
		
		const qrCodeDigits = this.keyController.getCode();

		if (qrCodeDigits != "" && !this.scanState) {
			this.intents++;
		}

		console.log("Intentos: ", this.intents)

    
		// Obtener el ticketId desde GameLogicService		
		if (qrCodeDigits != "") {
			let validateTicket = this.gameLogic.verifyTicket(qrCodeDigits)
			if(this.intents > 8 ){
				let game_message = [
					"Ha superado el número de intentos permitidos, por favor contacte a soporte técnico",
				]
				this.confirmDialog.error(game_message)
					this.scanState = true;
				setInterval(() => {
					window.location.replace("#/login")
				}, 5000);
			}else{
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
