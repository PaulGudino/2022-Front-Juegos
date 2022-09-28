import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { InicioGuard } from 'src/app/guardianes/inicio/inicio.guard';
import { RecuperarComponent } from './componentes/login/recuperar/recuperar.component';
import { ResetComponent } from './componentes/login/reset/reset/reset.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'reset-contraseña', component: ResetComponent },  
  { path: 'dashboard', loadChildren: () => import('./componentes/dashboard/dashboard.module').then(m => m.DashboardModule), 
  canActivate: [InicioGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
