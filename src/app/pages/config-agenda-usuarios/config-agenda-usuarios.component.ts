import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/services/compania.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-config-agenda-usuarios',
  templateUrl: './config-agenda-usuarios.component.html',
  styleUrls: ['./config-agenda-usuarios.component.css']
})
export class ConfigAgendaUsuariosComponent implements OnInit {

  constructor(private companiaService: CompaniaService,private router: Router, private auth: AuthService, private alert: AlertsService) { }

  usuarios = [];
  loading = false;

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.loading = true;
    this.companiaService.obtenerDoctoresCompania(this.auth.obtenerDoctorLogeado().Compania).subscribe((resp: any) => {
      this.usuarios = resp.mensaje;
      this.loading = false;
      //console.log(this.usuarios);
    }, err => this.alert.error('Hubo un problema al obtener los datos'));
  }

  irPerfilUsuario(id, tipoPerfil) {
    this.router.navigate(['/admin/configurar-agenda/', id]);
  }


}
