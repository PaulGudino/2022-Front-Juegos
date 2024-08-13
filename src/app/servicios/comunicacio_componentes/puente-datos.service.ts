import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { GameSelectionService } from '../game-selection/game-selection.service';

export interface ID {
   user_id: number;
}

@Injectable({
   providedIn: 'root',
})
export class PuenteDatosService {

   menu = '/assets/data/menu.json';

   /**
    * For testing environments
    */
   url = 'http://localhost:8000/';
   /**
    * For deployment environmnets
    */
   //
   //url = 'https://kioskotouch.pythonanywhere.com/';

   constructor(private http: HttpClient, private gameSelectionService: GameSelectionService) {
      this.gameSelectionService.selectedGame$.subscribe(game => {
         this.setMenu(game);
   });
 }
   geturl(): string {
      return this.url;
   }
   getMenu():Observable<Menu[]>{
      return this.http.get<Menu[]>(this.menu);
   }
   setMenu(name: string) {
      const menus: { [key: string]: string } = {
        'Tragamonedas': '/assets/data/tragamonedas.json',
        'Dados': '/assets/data/dados.json',
        'Puertas': '/assets/data/puertas.json',
        'Precision': '/assets/data/precision.json'
      };
    
      this.menu = menus[name];
   }
   setMenuGeneral(){
      this.menu = '/assets/data/menu.json';
   }
}
