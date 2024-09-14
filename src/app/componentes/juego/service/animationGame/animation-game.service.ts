import { GameLogicService } from "./../gameLogic/game-logic.service"
import { ElementRef, Injectable } from "@angular/core"
import { ConfirmDialogService } from "src/app/servicios/confirm-dialog/confirm-dialog.service"
import { KeyControllerService } from "../keyController/key-controller.service"
import { getAwardList } from "src/app/interfaces/awards/getAwardList"
import { AwardsService } from "src/app/servicios/awards/awards.service"
import { ThemeService } from "src/app/servicios/theme/theme.service"
import { DashboardStyleService } from "src/app/servicios/theme/dashboardStyle/dashboard-style.service"

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
	finalTransformDice: string = 'rotateX(0deg) rotateY(0deg)';
	currentFace: number = 1;


	// ----------------- Puertas -----------------
	finalTransformDoor: string = 'rotateY(0deg)';
	openTime: number = 0;
	currentDoor: number | null = null;
	isOpening = false;
	isGameStarted = false;
	isDoorSelected = false;
	doors = [
		{ isOpen: false, prize: '', image: this.dashStyle.get_image_door_left() },
		{ isOpen: false, prize: '', image: this.dashStyle.get_image_door_center() },
		{ isOpen: false, prize: '', image: this.dashStyle.get_image_door_right() }
	];
	prizes: getAwardList[] = [];

	// ----------------- Precision -----------------
	currentMinutes = 0;
	clockRunning = false;
	intervalId: any;
	currentTime = '00:00';
	targetTime = this.generateRandomTime();
	constructor(
		private gameLogicService: GameLogicService,
		private confirmDialog: ConfirmDialogService,
		public keyController: KeyControllerService,
		private awardsService: AwardsService,
		public theme: ThemeService,
		public dashStyle: DashboardStyleService

	) { }

	ngOnInit(): void {
		this.theme.getDesignInformation().subscribe((designData) => {
			this.dashStyle.loadData(designData[0]);
		})
	}

	// ----------------- Tragamonedas -----------------

	startGameTragamonedas(refCol1: any, refCol2: any, refCol3: any) {
		this.gameLogicService.winFirstTime = false
		this.isGameStarted = true;

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

						this.showWinMessage(this.gameLogicService.winAwardImage, this.gameLogicService.nameAwardImage);

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
						clearInterval(intervalId)
						if (this.gameLogicService.attempts === 0) {
							const options = {
								title: "./assets/img/palabras/perdio.png",
								image: "./assets/img/gameover.png",
								result_music: "./assets/audio/lose.mp3",
							}
							this.confirmDialog.end_game(options)
						} else {
							let options = {
								title: "./assets/img/palabras/sigue_participando.png",
								prize_name: "",
								image: "../../../../../assets/img/loseImage.png",
								result_music: "../../../../../assets/audio/lose.mp3",
							}
							this.confirmDialog.result_game(options)
						}
						setTimeout(() => {
							this.disabledPlayButton = false
						}, 3000);
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
		this.isGameStarted = true;
		console.log(this.gameLogicService.winner);
		if (this.keyController.getCode().length === 0) {
			let game_message = [
				"Debes ingresar un número para jugar",
			]
			this.confirmDialog.error(game_message)
		}
		else if (this.keyController.getCode().length > 1) {
			let game_message = [
				"Debes ingresar un número de un solo dígito",
			]
			this.confirmDialog.error(game_message)
		} else {

			if (this.gameLogicService.attempts > 0) {
				//Logic return true if win
				this.disabledPlayButton = true
				this.isRolling = true;
				const randomFace = Math.floor(Math.random() * 6) + 1;
				this.currentFace = randomFace;
				this.rollTime = Math.random() + 4;
				console.log("cara random", this.currentFace)
				if (this.gameLogicService.winner) {
					this.gameLogicService.winFirstTime = true

					const intervalId = setInterval(() => {
						setTimeout(() => {
							this.finalTransformDice = this.getTransformDice(parseInt(this.keyController.getCode()));
						}, this.rollTime);
						this.isRolling = false;
						clearInterval(intervalId)
						this.showWinMessage(this.gameLogicService.winAwardImage, this.gameLogicService.nameAwardImage);
						//imprimir ticket si ganó el juego (LOGICA IMPRESORA)
					}, this.rollTime * 750)
				} else {
					const intervalId = setInterval(() => {
						setTimeout(() => {

							this.finalTransformDice = this.getTransformDice(this.currentFace);
							while (parseInt(this.keyController.getCode()) === this.currentFace) {
								const randomFace2 = Math.floor(Math.random() * 6) + 1;
								this.currentFace = randomFace2
								this.finalTransformDice = this.getTransformDice(this.currentFace);
								console.log("salio la misma cara, se cambia a", this.currentFace)
							}
						}, this.rollTime);
						this.isRolling = false;
						clearInterval(intervalId)
						if (this.gameLogicService.attempts === 0) {
							const options = {
								title: "./assets/img/palabras/perdio.png",
								image: "./assets/img/gameover.png",
								result_music: "./assets/audio/lose.mp3",
							}
							this.confirmDialog.end_game(options)
						} else {
							let options = {
								title: "./assets/img/palabras/sigue_participando.png",
								prize_name: "",
								image: "./assets/img/loseImage.png",
								result_music: "./assets/audio/lose.mp3",
							}
							this.confirmDialog.result_game(options)
						}
						setTimeout(() => {
							this.disabledPlayButton = false
						}, this.rollTime * 500);
					}, this.rollTime * 750)
				}

				this.gameLogicService.setWinnerState(false)
				this.gameLogicService.decreaseAttemptCount()

			}
		}
	}

	getTransformDice(currentFace: number) {
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
		// Minutos desde las 00:00 hasta las 15:00
		const startMinutes = 15 * 60; // 15:00 en minutos
		// Minutos desde las 00:00 hasta las 21:00
		const endMinutes = 21 * 60 - 1; // 20:59 en minutos
		// Generar un número aleatorio entre startMinutes y endMinutes
		const randomMinutes = Math.floor(Math.random() * (endMinutes - startMinutes + 1)) + startMinutes;
		return this.formatTime(randomMinutes);
	}

	// Convertir hh:mm a segundos
	convertToSeconds(time: string): number {
		const [seconds, milliseconds] = time.split(':').map(Number);
		return seconds
	};


	startClock(): void {
		this.currentMinutes = 0;
		this.clockRunning = true;
		this.isGameStarted = true;
		this.currentTime = this.formatTime(this.currentMinutes);
		this.intervalId = setInterval(() => {
			this.currentMinutes = (this.currentMinutes + 1) % (24 * 60);
			this.currentTime = this.formatTime(this.currentMinutes);
		}, 1);

	}

	stopClock(): void {
		this.gameLogicService.winFirstTime = false;

		console.log("hora actual: ", this.currentTime, "hora objetivo: ", this.targetTime);
		clearInterval(this.intervalId);

		if (this.gameLogicService.attempts > 0) {

			// Función auxiliar para verificar si currentTime está a 1 segundo de targetTime
			const isOneSecondApart = (currentTime: string, targetTime: string): boolean => {
				const currentSeconds = this.convertToSeconds(currentTime);
				const targetSeconds = this.convertToSeconds(targetTime);
				console.log("currentSeconds", currentSeconds, "targetSeconds", targetSeconds);
				console.log("diferencia", Math.abs(currentSeconds - targetSeconds));
				return Math.abs(currentSeconds - targetSeconds) >= 1;
			};

			if (this.gameLogicService.winner && !isOneSecondApart(this.currentTime, this.targetTime)) {
				this.currentTime = this.formatTime(this.currentMinutes);
				this.currentTime = this.targetTime;

				this.gameLogicService.winFirstTime = true;
				this.showWinMessage(this.gameLogicService.winAwardImage, this.gameLogicService.nameAwardImage);
				this.gameLogicService.setWinnerState(false);

			} else {
				if (this.currentTime === this.targetTime) {
					this.currentMinutes = (this.currentMinutes + 1) % (24 * 60);
					this.currentTime = this.formatTime(this.currentMinutes);
				}

				if (this.gameLogicService.attempts === 1) {
					const options = {
						title: "./assets/img/palabras/perdio.png",
						image: "./assets/img/gameover.png",
						result_music: "./assets/audio/lose.mp3",
					};
					this.confirmDialog.end_game(options);
				} else {
					let options = {
						title: isOneSecondApart(this.currentTime, this.targetTime) ? "./assets/img/palabras/sigue_participando.png" : "./assets/img/palabras/sigue_participando.png",
						prize_name: "",
						image: isOneSecondApart(this.currentTime, this.targetTime) ? "./assets/img/loseImage.png" : "./assets/img/loseImage.png",
						result_music: "./assets/audio/lose.mp3",
					};
					this.confirmDialog.result_game(options);
				}
			}
			setTimeout(() => {
				this.isGameStarted = false;
			}, 3000);

			this.clockRunning = false;

			this.gameLogicService.decreaseAttemptCount();
		}
	}

	InitialTime() {
		this.currentTime = '00:00';
	}

	// ----------------- Puertas -----------------
	startGameDoor(): void {
		this.gameLogicService.winFirstTime = false
		this.isOpening = false;
		this.isGameStarted = true;
		this.isDoorSelected = false;
		this.disabledPlayButton = true
		this.doors.forEach(door => door.isOpen = false);  // Reset doors state
	}

	openDoor(index: number): void {
		if (this.isGameStarted && !this.doors[index].isOpen && !this.isOpening && !this.isDoorSelected) {
			if (this.gameLogicService.attempts > 0) {
				this.isOpening = true;
				this.currentDoor = index;
				this.openTime = Math.random() * 1 + 1;
				this.doors[index].isOpen = true;
				this.isDoorSelected = true;


				if (this.gameLogicService.winner) {
					this.doors[index].prize = this.gameLogicService.winAwardImage;
					this.gameLogicService.winFirstTime = true;
					setTimeout(() => {
						this.finalTransformDoor = this.getTransformDoors();
						this.isOpening = false;
						// Abrir todas las otras puertas automáticamente después de que termine la animación de la puerta seleccionada
						setTimeout(() => {
							this.openRemainingDoors(index);
						}, 1000); // Esperar 1.5 segundos antes de abrir las demás puertas

						setTimeout(() => {
							this.showWinMessage(this.doors[index].prize, this.gameLogicService.nameAwardImage)
						}, 2000)

						setTimeout(() => {
							this.isGameStarted = false;
						}, 4500);
					}, this.openTime * 1000);

				} else {
					this.doors[index].prize = './assets/img/loseImage.png';
					setTimeout(() => {
						this.finalTransformDoor = this.getTransformDoors();
						this.isOpening = false;
						// Abrir todas las otras puertas automáticamente después de que termine la animación de la puerta seleccionada
						setTimeout(() => {
							this.openRemainingDoors(index);
						}, 1000); // Esperar 1.5 segundos antes de abrir las demás puertas

						setTimeout(() => {
							this.showLoseMessage()
						}, 2000)

						setTimeout(() => {
							this.isGameStarted = false;
							this.disabledPlayButton = false
						}, 4500);
					}, this.openTime * 1000);
				}


				this.gameLogicService.decreaseAttemptCount()
				this.gameLogicService.setWinnerState(false)
			}

		}
	}

	openRemainingDoors(selectedIndex: number): void {
		this.isOpening = true;
		this.isDoorSelected = true;
		this.isGameStarted = false;
		this.doors.forEach((door, i) => {
			if (i !== selectedIndex) {
				setTimeout(() => {
					const randomPrizeIndex = Math.floor(Math.random() * this.prizes.length);
					door.prize = this.prizes[randomPrizeIndex].imagen;
					door.isOpen = true;
				}, 100 * (i + 1)); // Temporizador escalonado para abrir las puertas restantes
			}
		});

	}

	closeDoors(): void {
		this.doors.forEach((door, i) => {
			door.isOpen = false;
		});
	}


	printTicket(options: any): void {
		// Obtener la fecha actual
		const fechaActual = new Date();

		// Formatear la fecha en un formato legible (por ejemplo, "DD/MM/YYYY")
		const dia = String(fechaActual.getDate()).padStart(2, '0');
		const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
		const anio = fechaActual.getFullYear();
		const fechaFormateada = `${dia}/${mes}/${anio}`;
		const printWindow = window.open('', '', 'width=600,height=400');
		if (printWindow) {
			printWindow.document.write(`
				<html>
					<head>
						<title>Ticket de Premio</title>
					</head>
					<body onload="window.print(); window.close();">
						<div style="text-align: center; font-size: 18px; padding: 20px;">
            <img src="${options.title}" alt="Ganaste!" style="width: 100%; max-width: 300px;">
            <p style="margin: 20px 0; font-size: 20px">¡Felicidades! Has ganado: <br>${options.prize_name}</p>
            <img src="${options.image}" alt="Premio" style="width: 100%; max-width: 3000px;">
            <p style="margin: 20px 0;">Gracias por jugar.</p>
			<p style="margin: 20px 0;">Ticket válido únicamente el día ${fechaFormateada}</p>
        </div>
					</body>
				</html>
			`);
			printWindow.document.close();
		} else {
			console.error('No se pudo abrir la ventana de impresión.');
		}
	}
	showWinMessage(prize: string, name: string): void {
		let options = {
			title: "./assets/img/palabras/gano.png",
			prize_name: name,
			image: prize,
			result_music: "./assets/audio/win.mp3",
		};
		this.confirmDialog.result_game(options);
		// Lógica para imprimir ticket si ganó el juego
		this.printTicket(options);
	}

	showLoseMessage(): void {
		let options = {
			title: this.gameLogicService.attempts === 0 ? "./assets/img/palabras/perdio.png" : "./assets/img/palabras/sigue_participando.png",
			prize_name: "",
			image: this.gameLogicService.attempts === 0 ? "./assets/img/gameover.png" : "./assets/img/loseImage.png",
			result_music: "./assets/audio/lose.mp3",
		};
		if (this.gameLogicService.attempts === 0) {
			this.confirmDialog.end_game(options);
		} else {
			this.confirmDialog.result_game(options);
		}
	}

	getTransformDoors() {
		return 'rotateY(180deg)';
	}

	getPrizes(): void {
		this.awardsService.getAward().subscribe(prizes => {
			this.prizes = prizes;
		});
	}


}
