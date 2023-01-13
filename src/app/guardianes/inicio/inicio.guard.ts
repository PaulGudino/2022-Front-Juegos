import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/servicios/user/user.service';



@Injectable({
  providedIn: 'root'
})
export class InicioGuard implements CanActivate {

  constructor(
    private router: Router,
    private userSrv: ApiService,

    ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
    if (sessionStorage.getItem('user_id')) {
      this.verifyRol()
      return true;
    } else {
      this.router.navigate(['/juego']);
      return false;
    }
  }

  verifyRol(){
    let user_id = sessionStorage.getItem('user_id');
    if (user_id){
      this.userSrv.getUsuarioId(Number(user_id)).subscribe(
          (data:any)=>{
            sessionStorage.setItem('rol_id', data.rol_id);
          }
      )
    }
  }
  
}
