import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor(private auth: AuthService, 
    //private alert: AlertsService,
     private router: Router) { }

     usuario;

  ngOnInit(): void {
    this.obtenerUsuarioLoggeado();
    //console.log(this.usuario);
  }

  obtenerUsuarioLoggeado() {
    this. usuario = this.auth.obtenerDoctorLogeado();
  }

  logout() {
    this.auth.actualizarIngreso().subscribe(response => {
      localStorage.removeItem("token");
      localStorage.removeItem("doctor");
      //this.alert.info("Se ha finalizado la sesión", "Mensaje del sistema");
      this.router.navigate(["/login"]);
    });
  }
}
