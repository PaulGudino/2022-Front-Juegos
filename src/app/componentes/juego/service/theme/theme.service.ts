import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { PuenteDatosService } from "../../../../servicios/comunicacio_componentes/puente-datos.service"
import { Styles } from "src/app/interfaces/styles/Styles"
import { PublicityGameService } from "src/app/servicios/publicityGame/publicity-game.service"
import { PublicityGame } from "src/app/interfaces/publicityGame/PublicityGame"
import { GameLogicService } from "../gameLogic/game-logic.service"

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	publicityGameList: PublicityGame[] = []
	columna2 = [5, 6, 7, 8, 9, 10, 1, 2, 3, 4]
	columna3 = [3, 4, 5, 6, 7, 8, 9, 10, 1, 2]
	publicityGameListCol2: PublicityGame[] = []
	publicityGameListCol3: PublicityGame[] = []

	constructor(private http: HttpClient, private puente: PuenteDatosService, private publicityGame: PublicityGameService) {}

	url = this.puente.geturl()

	shuffle(array: any) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		if (array[0] == 1) {
			let tmp = array[0]
			array[0] = array[1]
			array[1] = tmp
		}
		return array
	}

	public getThemeGame(isWinner: boolean) {
		if (!isWinner) {
			this.columna2 = this.shuffle(this.columna2)
			this.columna3 = this.shuffle(this.columna3)
		}
		this.publicityGame.getAllPublicityGame().subscribe((publicityGame) => {
			this.publicityGameList = publicityGame
			this.columna2.map((i) => {
				publicityGame.forEach((image) => {
					if (image.id == i) {
						this.publicityGameListCol2.push(image)
					}
				})
			})
			this.columna3.map((i) => {
				publicityGame.forEach((image) => {
					if (image.id == i) {
						this.publicityGameListCol3.push(image)
					}
				})
			})
		})
	}
}
