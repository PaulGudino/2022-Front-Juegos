import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/auth/login';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { OlvideContraseña } from 'src/app/interfaces/auth/olvidecontraseña';
import { RecuperarContraseña } from 'src/app/interfaces/auth/recuperarContraseña';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//url = this.puente.geturl();
    url = 'http://127.0.0.1:8000/'; // Cambia esta URL a tu servidor local
  constructor(private http: HttpClient, private puente: PuenteDatosService) { }

  Login(login: Login){
    return this.http.post(this.url+'auth/login/', login);
  }

  Logout(form: FormData){
    return this.http.post(this.url+'auth/logout/', form);
  }
  OlvideContraseña(email: OlvideContraseña){
    return this.http.post(this.url+'auth/forgot-password/', email);
  }
  RecuperarContraseña(recueprar: RecuperarContraseña){
    return this.http.post(this.url+'auth/reset-forgot-password/', recueprar);
  }
  auth_token(form : FormData){
    return this.http.post(this.url+'token/', form);
  }

}
