import { GameLogicService } from "./../gameLogic/game-logic.service"
import { ElementRef, Injectable } from "@angular/core"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"

@Injectable({
	providedIn: "root",
})
export class AnimationGameService {
	columna1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	columna2 = [5, 6, 7, 8, 9, 10, 1, 2, 3, 4]
	columna3 = [3, 4, 5, 6, 7, 8, 9, 10, 1, 2]

	widthImage: number = 270 //heigth image + gap
	animationCountCol1 = 4
	disabledPlayButton: boolean = false

	constructor(private gameLogicService: GameLogicService,private confirmDialog: ConfirmDialogService,) {}

	startGame(refCol1: any, refCol2: any, refCol3: any) {
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
						setTimeout(() => {
							this.gameLogicService.winFirstTime = true
						}, 2500)
						
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
					}
				}, 2030)
				// }, 2500)
			}

			this.gameLogicService.setWinnerState(false)
			this.gameLogicService.decreaseAttemptCount()
		} else {
			// const options = {
			// 	title: 'Se terminó la partida',
			// 	image: './assets/img/tryagain.png'
			// };
			// this.confirmDialog.result_game(options)
			setTimeout(() => {
				window.location.reload()
			}, 2000)
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
}
