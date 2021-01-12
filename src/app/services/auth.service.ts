import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
//import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //toastr: ToastrAlertService;
  router: Router;
  baseUrl = environment.apiURL + 'auth/';
  jwtHelper = new JwtHelperService();
  public doctor = {};

  login(model: any, usuario?: string) {
    let url;

    usuario ? url = this.baseUrl + "login?tipo=usuario" : url = this.baseUrl + "login";

    //console.log(url);

    return this.http.post(url, model).pipe(
      // descompone el cuerpo y guarda el token en el localstorage
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("doctor", JSON.stringify(user.doctor));
          this.doctor = user.doctor;
        }
      })
    );
  }

  loggedIn() {
    // busca el token en el localStorage
    const token = localStorage.getItem("token");
    // Verificar el estado del tokem, responde bool
    return !this.jwtHelper.isTokenExpired(token);
  }

  obtenerDoctorLogeado(){
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    if (doctor){
      return doctor;
    } else {
      return null;
    } 
  }

  sobreescribirDoctorLogeado(doctor){
    if (localStorage.getItem('doctor')){
      localStorage.removeItem('doctor');
      localStorage.setItem('doctor',JSON.stringify(doctor));
      return JSON.parse(localStorage.getItem('doctor'));
    } else {
      localStorage.setItem('doctor',JSON.stringify(doctor));
      return JSON.parse(localStorage.getItem('doctor'));
    }
  }

  cambiarContrasena(contrasenas: any) {
    return this.http.post(this.baseUrl + 'cambiarcontrasena', contrasenas)
  }

  recuperarContrasena(correo: string) {
    return this.http.post(this.baseUrl + 'recuperarcontrasena', {Correo: correo})
  }

  actualizarIngreso() {
    return this.http.post(this.baseUrl + 'ultimoingreso', {Correo: this.obtenerDoctorLogeado().Correo})
  }
}
