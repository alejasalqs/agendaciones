import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertsService } from '../services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private  auth: AuthService,
    //private alerts: AlertsService,
    private router: Router
  ){}

  canActivate(): boolean {
    
    //this.auth.loggedIn()
    
    if (true) {
      return true;
    }
    
    console.log('Ruta bloqueada');
    //this.alerts.error("Debe iniciar sesión para acceder a este sitio");
    this.router.navigate(["/login"]);
  }  
}
