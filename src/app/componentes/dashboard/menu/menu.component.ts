import { Observable } from 'rxjs';
import { Menu } from './../../../interfaces/menu';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/user/user.service';
import { Router } from '@angular/router';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { AuthInterceptor } from 'src/app/interceptores/auth.interceptor';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  Titulo = 'Menu';
  Titulo2 = 'App Juegos'
  menu: Menu[] = [];
  admin: any = ''
  constructor(
    private api: ApiService,
    private router: Router,
    private staticData: PuenteDatosService,
    private auth: AuthService
    ) {
  }


  ngOnInit(): void {
    this.cargarMenu();
    this.admin = sessionStorage.getItem('user_id') 
  }

  cargarMenu() {
    this.staticData.getMenu().subscribe((data) => {
      if (sessionStorage.getItem('rol_id') != '1'){
        for (let i = 0; i < data.length; i++) {
          if (data[i].nombre != 'Usuarios' && data[i].nombre != 'Roles'){
            this.menu.push(data[i]);
          }
        }
      }else{
        this.menu = data;
      }
    });
  }
  logout(){
    let refresh !: string
    if (sessionStorage.getItem('token')){
        let formData: FormData = new FormData();
        refresh = sessionStorage.getItem('refresh')!;
        formData.append('refresh', refresh);
        this.auth.Logout(formData).subscribe(
          res => {
            this.router.navigate(['/juego']);
            sessionStorage.removeItem('user_id')
            sessionStorage.removeItem('rol_id')
          },
          err => console.log(err)
        );
    }else{
      this.router.navigate(['/juego']);
    }
  }
}