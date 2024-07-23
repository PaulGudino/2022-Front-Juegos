import { GameLogicService } from "./../gameLogic/game-logic.service"
import { ElementRef, Injectable } from "@angular/core"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"
import { KeyControllerService } from "../keyController/key-controller.service"
import { PrecisionViewComponent } from "../../pages/precision-view/precision-view.component"

@Injectable({
	providedIn: "root",
})
export class AnimationGameService {
	// ----------------- Tragamonedas -----------------
	columna1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	columna2 = [5, 6, 7, 8, 9, 10, 1, 2, 3, 4]
	columna3 = [3, 4, 5, 6, 7, 8, 9, 10, 1, 2]

	widthImage: number = 320 //heigth image + gap
	animationCountCol1 = 4
	disabledPlayButton: boolean = false

	// ----------------- Rolldice -----------------
	isRolling = false;
	rollTime: number = 0;
	finalTransform: string = 'rotateX(0deg) rotateY(0deg)';
	currentFace: number = 1;


	// ----------------- Puertas -----------------
	
	// ----------------- Precision -----------------
	currentMinutes = 0;
	clockRunning = false;
	intervalId: any;
	currentTime = '00:00';
	resultMessage = '';
	targetTime = this.generateRandomTime();
	constructor(
		private gameLogicService: GameLogicService, 
		private confirmDialog: ConfirmDialogService,
		public keyController: KeyControllerService,
		
	) {}
	
	// ----------------- Tragamonedas -----------------

	startGameTragamonedas(refCol1: any, refCol2: any, refCol3: any) {
		this.gameLogicService.winFirstTime = false

		if (this.gameLogicService.attempts > 0) {
			//Logic return true if win
			this.disabledPlayButton = true

			if (this.gameLogicService.winner) {
				const n = Math.floor(Math.random() * 9) + 1 //Indice a mostrar ganador
				const intervalId = setInterval(() => {
					let vueltas = this.widthImage * -9
					if (this.animationCountCol1 > 0) {
						this.animationCountCol1 -= 1

						refCol1.style.transform = `translateY(${vueltas}px)`
						refCol1.style.transition =
							"transform 2s cubic-bezier(.17,.67,.83,.67)"
						refCol1.style.filter = "blur(3px)"

						refCol2.style.transform = `translateY(${vueltas}px)`
						refCol2.style.transition =
							"transform 2s cubic-bezier(.17,.67,.83,.67)"
						refCol2.style.filter = "blur(3px)"

						refCol3.style.transform = `translateY(${vueltas}px)`
						refCol3.style.transition =
							"transform 2s cubic-bezier(.17,.67,.83,.67)"
						refCol3.style.filter = "blur(3px)"

						setTimeout(() => {
							this.translateToBegining(
								refCol1,
								refCol2,
								refCol3
							)
						}, 2000)
					} else {
						let movimientosCol1 = (n - 1) * this.widthImage * -1
						let movimientosCol2
						if (n >= 5) {
							movimientosCol2 =
								(n - 5) *
								this.widthImage *
								-1
						} else {
							movimientosCol2 =
								(n + 5) *
								this.widthImage *
								-1
						}
						let movimientosCol3
						if (n >= 3) {
							movimientosCol3 =
								(n - 3) *
								this.widthImage *
								-1
						} else {
							movimientosCol3 =
								(n + 7) *
								this.widthImage *
								-1
						}

						this.translateToBegining(refCol1, refCol2, refCol3)

						refCol1.style.transform = `translateY(${movimientosCol1}px)`
						refCol1.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"
						refCol1.style.filter = "blur(0px)"

						refCol2.style.transform = `translateY(${movimientosCol2}px)`
						refCol2.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"
						refCol2.style.filter = "blur(0px)"

						refCol3.style.transform = `translateY(${movimientosCol3}px)`
						refCol3.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"
						refCol3.style.filter = "blur(0px)"

						this.animationCountCol1 = 5
						this.disabledPlayButton = false

						this.gameLogicService.winFirstTime = true

						let options = {
							title: "HAS GANADO!!!",
							image: this.gameLogicService.winAwardImage,
							result_music: "./assets/audio/win.mp3",
						}
						this.confirmDialog.result_game(options)

						clearInterval(intervalId)
					}
				}, 2030)
			} else {
				const intervalId = setInterval(() => {
					let vueltas = (this.widthImage + 0) * -9
					if (this.animationCountCol1 > 0) {
						this.animationCountCol1 -= 1

						refCol1.style.transform = `translateY(${vueltas}px)`
						refCol1.style.transition =
							"transform 2s cubic-bezier(.17,.67,.83,.67)"
						refCol1.style.filter = "blur(3px)"

						refCol2.style.transform = `translateY(${vueltas}px)`
						refCol2.style.transition =
							"transform 2s cubic-bezier(.17,.67,.83,.67)"
						refCol2.style.filter = "blur(3px)"

						refCol3.style.transform = `translateY(${vueltas}px)`
						refCol3.style.transition =
							"transform 2s cubic-bezier(.17,.67,.83,.67)"
						refCol3.style.filter = "blur(3px)"

						// refCol1.style.transform = `translateY(${vueltas}px)`
						// refCol1.style.transition =
						// 	"transform 2s cubic-bezier(0.85, 0, 0.15, 1)"

						// refCol2.style.transform = `translateY(${vueltas}px)`
						// refCol2.style.transition =
						// 	"transform 2s cubic-bezier(0.85, 0, 0.15, 1) "

						// refCol3.style.transform = `translateY(${vueltas}px)`
						// refCol3.style.transition =
						// 	"transform 2s cubic-bezier(0.85, 0, 0.15, 1)"
						setTimeout(() => {
							this.translateToBegining(
								refCol1,
								refCol2,
								refCol3
							)
							// }, 1015)
						}, 2000)
					} else {
						let randomPosition = Math.floor(Math.random() * this.columna1.length)
						let translate = this.widthImage * randomPosition

						refCol1.style.transform = `translateY(-${translate}px)`
						refCol1.style.transition = "transform 1s "
						refCol1.style.filter = "blur(0px)"

						refCol2.style.transform = `translateY(-${translate}px)`
						refCol2.style.transition = "transform 1s "
						refCol2.style.filter = "blur(0px)"

						refCol3.style.transform = `translateY(-${translate}px)`
						refCol3.style.transition = "transform 1s "
						refCol3.style.filter = "blur(0px)"

						this.animationCountCol1 = 5
						this.disabledPlayButton = false
						clearInterval(intervalId)
						if(this.gameLogicService.attempts === 0){
							const options = {
								title: "Se terminó la partida",
								image: "./assets/img/gameover.png",
								result_music: "./assets/audio/lose.mp3",
							}
							this.confirmDialog.end_game(options)
						}else{
							let options = {
								title: "INTENTA OTRA VEZ!!!",
								image: "../../../../../assets/img/loseImage.png",
								result_music: "../../../../../assets/audio/lose.mp3",
							}
							this.confirmDialog.result_game(options)
						}
					}
				}, 2030)
				// }, 2500)
			}

			this.gameLogicService.setWinnerState(false)
			this.gameLogicService.decreaseAttemptCount()
		}
	}

	private translateToBegining(refCol1: any, refCol2: any, refCol3: any) {
		refCol1.style.transform = `translateY(0px)`
		refCol1.style.transition = "transform 0s"

		refCol2.style.transform = `translateY(231px)`
		refCol2.style.transition = "transform 0s "

		refCol3.style.transform = `translateY(231px)`
		refCol3.style.transition = "transform 0s "
	}

	// ----------------- Rolldice -----------------

	startGameRolldice() {
		this.gameLogicService.winFirstTime = false

		if (this.gameLogicService.attempts > 0) {
			//Logic return true if win
			this.disabledPlayButton = true
			this.isRolling = true;
			const randomFace = Math.floor(Math.random() * 6) + 1;
			this.currentFace = randomFace;
			this.rollTime = Math.random() * 1 + 1;
			console.log("cara random", this.currentFace)
			setTimeout(() => {
			this.isRolling = false;
			
			if (this.gameLogicService.winner) {
				this.finalTransform = this.getTransform(parseInt(this.keyController.getCode()));
				this.gameLogicService.winFirstTime = true
				let options = {
					title: "HAS GANADO!!!",
					image: this.gameLogicService.winAwardImage,
					result_music: "./assets/audio/win.mp3",
				}
				this.confirmDialog.result_game(options)
				//imprimir ticket si ganó el juego (LOGICA IMPRESORA)
			} else {
				this.finalTransform = this.getTransform(this.currentFace);
				while(parseInt(this.keyController.getCode()) === this.currentFace){
					const randomFace2 = Math.floor(Math.random() * 6) + 1;
					this.currentFace = randomFace2
					this.finalTransform = this.getTransform(this.currentFace);
					console.log("salio la misma cara, se cambia a",this.currentFace)
				}
				if(this.gameLogicService.attempts === 0){
					const options = {
						title: "Se terminó la partida",
						image: "./assets/img/gameover.png",
						result_music: "./assets/audio/lose.mp3",
					}
					this.confirmDialog.end_game(options)
				}else{
					let options = {
						title: "INTENTA OTRA VEZ!!!",
						image: "../../../../../assets/img/loseImage.png",
						result_music: "../../../../../assets/audio/lose.mp3",
					}
					this.confirmDialog.result_game(options)
				}
				this.disabledPlayButton = false
				
			}
		}, this.rollTime * 1000);
		this.gameLogicService.setWinnerState(false)
		this.gameLogicService.decreaseAttemptCount()

		} 
	}

	getTransform(currentFace: number) {
		switch (currentFace) {
		  case 1: return 'rotateX(0deg) rotateY(0deg)';
		  case 2: return 'rotateX(0deg) rotateY(180deg)';
		  case 3: return 'rotateX(90deg) rotateY(0deg)';
		  case 4: return 'rotateX(-90deg) rotateY(0deg)';
		  case 5: return 'rotateX(0deg) rotateY(-90deg)';
		  case 6: return 'rotateX(0deg) rotateY(90deg)';
		  default: return 'rotateX(0deg) rotateY(0deg)';
		}
	}

	// ----------------- Precision -----------------
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
		this.currentMinutes = 0;
		this.clockRunning = true;
		this.currentTime = this.formatTime(this.currentMinutes);
		this.intervalId = setInterval(() => {
			this.currentMinutes = (this.currentMinutes + 1) % (24 * 60);
			this.currentTime = this.formatTime(this.currentMinutes);
		}, 250);

	}
	
	stopClock(): void {
		
		this.gameLogicService.winFirstTime = false
		console.log("hora actual: ",this.currentTime,"hora objetivo: ", this.targetTime);
		clearInterval(this.intervalId);
		
		if(this.gameLogicService.attempts > 0){
			
			if (this.gameLogicService.winner) {
				this.currentTime = this.formatTime(this.currentMinutes);
				this.currentTime = this.targetTime;

				this.gameLogicService.winFirstTime = true
				let options = {
					title: "HAS GANADO!!!",
					image: this.gameLogicService.winAwardImage,
					result_music: "./assets/audio/win.mp3",
				}
				this.confirmDialog.result_game(options)
	
			} else {
				if(this.currentTime === this.targetTime){
					this.currentMinutes = (this.currentMinutes + 1) % (24 * 60);
					this.currentTime = this.formatTime(this.currentMinutes);
				}

				
			}
			this.clockRunning = false;
			this.gameLogicService.decreaseAttemptCount()
			this.gameLogicService.setWinnerState(false)
			
		}
		if(this.gameLogicService.attempts === 0){
			const options = {
				title: "Se terminó la partida",
				image: "./assets/img/gameover.png",
				result_music: "./assets/audio/lose.mp3",
			}
			this.confirmDialog.end_game(options)
		}else{
			let options = {
				title: "INTENTA OTRA VEZ!!!",
				image: "../../../../../assets/img/loseImage.png",
				result_music: "../../../../../assets/audio/lose.mp3",
			}
			this.confirmDialog.result_game(options)
		}
	}
}
