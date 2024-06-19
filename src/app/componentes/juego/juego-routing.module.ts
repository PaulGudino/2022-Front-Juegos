import { JuegoGuard } from './../../guardianes/Juego/juego.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JuegoComponent} from './juego.component'
import {ScanViewComponent} from './pages/scan-view/scan-view.component';
import {PlayViewComponent} from './pages/play-view/play-view.component';
import { RolldiceViewComponent } from './pages/rolldice-view/rolldice-view.component';
import { SelectiongameViewComponent } from './pages/selectiongame-view/selectiongame-view.component';
export const routes: Routes = [
    {
      path:'',component:JuegoComponent,
    },
    {
      path:'scan',component:ScanViewComponent,
      canActivate: [JuegoGuard],
      data: { Validate_game: 'juego_scan' } 
    },
    {
      path:'selection',component:SelectiongameViewComponent,
      data: { Validate_game: 'selection_game' } 
    },
    {
      path:'play',component:PlayViewComponent,
      canActivate: [JuegoGuard],
      data: { Validate_game: 'juego_play' } 
    },
    {
      path:'rolldice',component:RolldiceViewComponent,
      canActivate: [JuegoGuard],
      data: { Validate_game: 'juego_rolldice' } 
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoRoutingModule { }
