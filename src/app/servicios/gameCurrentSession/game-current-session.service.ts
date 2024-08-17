import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCurrentSession_Data } from 'src/app/interfaces/gameCurrentSession/gamecurrentsession_data'
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class GameCurrentSessionService {

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService
  ) { }

  url = this.puente.geturl();

  getGameCurrentSessionFilter(filter: string): Observable<GameCurrentSession_Data[]> {
    return this.http.get<GameCurrentSession_Data[]>(this.url + 'api/gamecurrentsessionfilter/' + filter);
  }

  getGameCurrentSessionById(id: number): Observable<GameCurrentSession_Data> {
    return this.http.get<GameCurrentSession_Data>(this.url + 'api/gamecurrentsession/' + id + '/');
  }

  postGameCurrentSession(data: any) {
		return this.http.post(this.url + 'api/gamecurrentsession/', data).subscribe((data) => {
			console.log('data')
		})
	}
 
  putGameCurrentSession(id: number, data: FormData): Observable<any> {
    return this.http.put(this.url + 'api/gamecurrentsession/' + id + '/', data);
  }

  deleteGameCurrentSession(id: number): Observable<any> {
    return this.http.delete(this.url + 'api/gamecurrentsession/' + id + '/');
  }

  endGameCurrentSession(id: number, data: FormData): Observable<any> {
    return this.http.post(this.url + 'api/gamecurrentsession/' + id + '/end_game/', data);
  }

  //METODO PARA ACTUALIZAR EL ID DEL JUEGO QUE SE SELECCIONO
  // Nuevo método para actualizar game_id
  updateGameId(kioskoNumero: string, gameId: string) {
    const data = {
        kiosko_numero: kioskoNumero,
        game_id: gameId
    };
    return this.http.patch<any>(this.url + 'api/gamecurrentsession/update_game_id/', data);
  }
  
  
  getLastGameCurrentSession(kiosko_numero: string): Observable<GameCurrentSession_Data> {
    return this.http.get<GameCurrentSession_Data>(this.url + 'api/gamecurrentsession/get_last_session/', {
      params: { kiosko_numero }
    });
  }

  getFilter(filter: string) {
		return this.http.get<GameCurrentSession_Data[]>(this.url + 'api/gamecurrentfilter/' + filter)
	}
  

  
}
