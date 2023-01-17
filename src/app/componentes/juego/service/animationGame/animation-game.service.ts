import { GameLogicService } from "./../gameLogic/game-logic.service"
import { ElementRef, Injectable } from "@angular/core"

@Injectable({
	providedIn: "root",
})
export class AnimationGameService {
	columna1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	columna2 = [5, 6, 7, 8, 9, 10, 1, 2, 3, 4]
	columna3 = [3, 4, 5, 6, 7, 8, 9, 10, 1, 2]

	widthImage: number = 210 //heigth image + gap
	animationCountCol1 = 5
	disabledPlayButton: boolean = false

	constructor(private gameLogicService: GameLogicService) {}

	startGame(refCol1: any, refCol2: any, refCol3: any) {
		if (this.gameLogicService.attempts > 0) {
			//Logic return true if win
			this.disabledPlayButton = true

			if (this.gameLogicService.winner) {
				const n = Math.floor(Math.random() * 9) + 1 //Indice a mostrar ganador
				console.log("Indice a ganar: " + n)
				const intervalId = setInterval(() => {
					let vueltas = this.widthImage * -9
					console.log("ejecucion setTimeout")
					console.log(this.animationCountCol1)
					console.log(`numero ganador: ${n}`)
					if (this.animationCountCol1 > 0) {
						this.animationCountCol1 -= 1
						console.log(refCol1)

						refCol1.style.transform = `translateY(${vueltas}px)`
						refCol1.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"

						refCol2.style.transform = `translateY(${vueltas}px)`
						refCol2.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"

						refCol3.style.transform = `translateY(${vueltas}px)`
						refCol3.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"
						setTimeout(() => {
							refCol1.style.transform = `translateY(0px)`
							refCol1.style.transition =
								"transform 0s cubic-bezier(.17,.67,.83,.67)"

							refCol2.style.transform = `translateY(0px)`
							refCol2.style.transition =
								"transform 0s cubic-bezier(.17,.67,.83,.67)"

							refCol3.style.transform = `translateY(0px)`
							refCol3.style.transition =
								"transform 0s cubic-bezier(.17,.67,.83,.67)"
						}, 1000)
					} else {
						let movimientosCol1 =
							(n - 1) *
							this.widthImage *
							-1
						let movimientosCol2
						if (n >= 5) {
							movimientosCol2 =
								(n -
									5) *
								this
									.widthImage *
								-1
						} else {
							movimientosCol2 =
								(n +
									5) *
								this
									.widthImage *
								-1
						}
						let movimientosCol3
						if (n >= 3) {
							movimientosCol3 =
								(n -
									3) *
								this
									.widthImage *
								-1
						} else {
							movimientosCol3 =
								(n +
									7) *
								this
									.widthImage *
								-1
						}
						console.log("MOVIMIENTOS COL2: ", movimientosCol2)

						refCol1.style.transform = `translateY(0px)`
						refCol1.style.transition =
							"transform 0s cubic-bezier(.17,.67,.83,.67)"

						refCol2.style.transform = `translateY(0px)`
						refCol2.style.transition =
							"transform 0s cubic-bezier(.17,.67,.83,.67)"

						refCol3.style.transform = `translateY(0px)`
						refCol3.style.transition =
							"transform 0s cubic-bezier(.17,.67,.83,.67)"

						refCol1.style.transform = `translateY(${movimientosCol1}px)`
						refCol1.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"

						refCol2.style.transform = `translateY(${movimientosCol2}px)`
						refCol2.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"

						refCol3.style.transform = `translateY(${movimientosCol3}px)`
						refCol3.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"

						this.animationCountCol1 = 5
						this.disabledPlayButton = false
						clearInterval(intervalId)
					}
				}, 1030)
			} else {
				const intervalId = setInterval(() => {
					let vueltas = this.widthImage * -9
					console.log("ejecucion setTimeout")
					console.log(this.animationCountCol1)
					if (this.animationCountCol1 > 0) {
						this.animationCountCol1 -= 1
						console.log(refCol1)

						refCol1.style.transform = `translateY(${vueltas}px)`
						refCol1.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"

						refCol2.style.transform = `translateY(${vueltas}px)`
						refCol2.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"

						refCol3.style.transform = `translateY(${vueltas}px)`
						refCol3.style.transition =
							"transform 1s cubic-bezier(.17,.67,.83,.67)"
						setTimeout(() => {
							refCol1.style.transform = `translateY(0px)`
							refCol1.style.transition =
								"transform 0s cubic-bezier(.17,.67,.83,.67)"

							refCol2.style.transform = `translateY(0px)`
							refCol2.style.transition =
								"transform 0s cubic-bezier(.17,.67,.83,.67)"

							refCol3.style.transform = `translateY(0px)`
							refCol3.style.transition =
								"transform 0s cubic-bezier(.17,.67,.83,.67)"
						}, 1000)
					} else {
						this.animationCountCol1 = 5
						this.disabledPlayButton = false
						clearInterval(intervalId)
					}
				}, 1030)
			}

			this.gameLogicService.setWinnerState(false)
			this.gameLogicService.decreaseAttemptCount()
		} else {
			alert("out of attempts")
		}
	}
}
