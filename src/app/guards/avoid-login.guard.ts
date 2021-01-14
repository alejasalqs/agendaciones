import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertsService } from '../services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AvoidLoginGuard implements CanActivate {
  constructor (
    private  auth: AuthService,
    private alerts: AlertsService,
    private router: Router
  ){}
  canActivate(): boolean {
    
    //this.auth.loggedIn()
    
    if (!this.auth.loggedIn()) {
      return true;
    }
    
    //this.alerts.error("Debe iniciar sesión para acceder a este sitio");
    this.router.navigate(["/admin/dashboard"]);
  } 
  
}
