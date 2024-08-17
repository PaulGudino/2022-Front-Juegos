import { MatchService } from 'src/app/servicios/match/match.service';
import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/game/game.service';
import { Game } from 'src/app/interfaces/game/Game';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { lastValueFrom } from 'rxjs';
@Component({
   selector: 'app-game-selection',
   styleUrls: ['./game-selection.component.css'],
   templateUrl: './game-selection.component.html',
})
export class GameSelectionComponent implements OnInit {
   singularName: string = 'Juego';
   pluralName: string = 'Juegos';
   actionName: string = 'Seleccionar';
   allGames: Game[] = [];
   state: string = '';
   permisos:any = [];
   total_players_tragamonedas = 0
   total_players_precision = 0
   total_players_puertas = 0
   total_players_dados = 0
   constructor(
      private permisos_api : PermisosService,
      private GameAPI: GameService,
      private staticData: PuenteDatosService,
      private router: Router,
      private snackbar: SnackbarService,
      private gameCurrentSession: GameCurrentSessionService,
      private gameSelectionService: GameSelectionService,
      public dashStyle: DashboardStyleService,
      private theme: ThemeService,
   ) {
      this.GameAPI.getAll().subscribe((data) => {
         this.allGames = data;
      });
   }

   onSelectGame(gameName: string) {
      this.gameSelectionService.setSelectedGame(gameName);
      this.juego_settings(gameName);
   }

   getState(gameId: number) : String{
      let game: Game[] = this.allGames.filter(
         (game: Game) => game.id == String(gameId)
      );
      return game[0].state;
   }

   ngOnInit(): void {
      // this.loadGames();
      this.staticData.setMenuGeneral();
      this.gameCurrentSession.getFilter('?id=&game_id=1').subscribe(
         (data: any) => {
            this.total_players_tragamonedas = Object.keys(data).length;

         }
      )
      this.gameCurrentSession.getFilter('?id=&game_id=2').subscribe(
         (data: any) => {
            this.total_players_precision = Object.keys(data).length;

         }
      )
      this.gameCurrentSession.getFilter('?id=&game_id=3').subscribe(
         (data: any) => {
            this.total_players_dados = Object.keys(data).length;

         }
      )

      this.gameCurrentSession.getFilter('?id=&game_id=4').subscribe(
         (data: any) => {
            this.total_players_puertas = Object.keys(data).length;

         }
      )

      this.theme.getDesignInformation().subscribe((designData) => {

         this.dashStyle.loadData(designData[0]);
      })
   }

   juego_settings(name: string) {


      const rutas: { [key: string]: string } = {
         'Tragamonedas': '/dashboard/juego/resumen',
         'Dados': '/dashboard/juego/resumen/rolldice',
         'Puertas': '/dashboard/juego/resumen/puertas',
         'Precision': '/dashboard/juego/resumen/precision'
      };

      const ruta = rutas[name];
      this.router.navigate([ruta]);
   }


   async toogleActiveGame(gameId: number) {
      await this.permisoActivar();
      if (this.permisos.length > 0) {
         const options = {
         title: 'ACTIVAR/DESACTIVAR JUEGO',
         message: '¿ESTÁ SEGURO QUE DESEA ACTIVAR/DESACTIVAR EL JUEGO?',
         cancelText: 'CANCELAR',
         confirmText: 'CONFIRMAR'
         };
         let game: Game[] = this.allGames.filter(
            (game: Game) => game.id == String(gameId)
         );
         console.log(game[0])
         let state = game[0].state;
         console.log(state)
         let newState;
         if (state == 'Activado') {
            newState = 'Desactivado';
         } else {
            newState = 'Activado';
         }

         let gamePut: any = {
            id: String(gameId),
            modification_date: new Date().toISOString(),
            state: newState,
            is_active: 'true',
         };
         this.GameAPI.putGame(gameId, gamePut).subscribe((res) => {
            console.log(res);
         });
         
         this.snackbar.mensaje('Se a actualizado el estado del juego');

         window.location.reload();
      }else {
         this.snackbar.mensaje('No tienes permisos para Activar/Desactivar Juegos');
       }

   }
   
   async permisoActivar(){
      let rolId = Number(sessionStorage.getItem('rol_id'));
      let permiso = await lastValueFrom(this.permisos_api.getPermisosbyName('Activar/Desactivar Juego'));
      let permissionId = Number(permiso[0].id);
      const promise = await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rolId, permissionId));
      this.permisos = promise;
    }
}
