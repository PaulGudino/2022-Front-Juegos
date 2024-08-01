import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';

import { PlayViewComponent } from './componentes/juego/pages/play-view/play-view.component';
import { RolldiceViewComponent } from './componentes/juego/pages/rolldice-view/rolldice-view.component';

import { InicioGuard } from 'src/app/guardianes/inicio/inicio.guard';
import { RecuperarComponent } from './componentes/login/recuperar/recuperar.component';
import { ResetComponent } from './componentes/login/reset/reset/reset.component';
import { PrecisionViewComponent } from './componentes/juego/pages/precision-view/precision-view.component';

import { PuertasViewComponent } from './componentes/juego/pages/puertas-view/puertas-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'reset-contraseña', component: ResetComponent },
  { path: 'dashboard', loadChildren: () => import('./componentes/dashboard/dashboard.module').then(m => m.DashboardModule),
  canActivate: [InicioGuard] },
  { path: 'juego', loadChildren: () => import('./componentes/juego/juego.module').then(m => m.JuegoModule)},
  
  { path: 'play', component: PlayViewComponent },
  { path: 'rolldice', component: RolldiceViewComponent },
  { path: 'precision', component: PrecisionViewComponent },
  { path: 'puertas', component: PuertasViewComponent },
  
  { path: '**', redirectTo: 'juego' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }