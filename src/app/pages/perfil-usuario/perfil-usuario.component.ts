import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuariosService, private route: ActivatedRoute, private alert: AlertsService) { }

  IdDoctor;
  idCompania;
  modelUsuario;
  actualizandoDatos;

  ngOnInit(): void {
    this.actualizandoDatos = false;
    this.obtenerParametros();
    this.obtenerInformacionUsuario();
  }

  obtenerParametros() {
    this.route.params.subscribe(params => this.IdDoctor = params["id"]);
  }


  obtenerInformacionUsuario() {
    this.usuarioService.obtenerUsuariosDeCompaniaPorId(1, this.IdDoctor).subscribe((resp: any) => {
      this.modelUsuario = resp.usuario;
      console.log(this.modelUsuario);
    })
  }

  actualizarPerfil() {
    this.actualizandoDatos = true;
    delete this.modelUsuario.Id;
    delete this.modelUsuario.Compania;
    delete this.modelUsuario.RolUsuario;
    delete this.modelUsuario.Correo;
    
    this.usuarioService.actualizarPerfilUsuario(this.IdDoctor,this.modelUsuario).subscribe(resp => {
      console.log(resp);
      this.alert.success('Operación realizada con éxito');
      this.actualizandoDatos = false;
    }, err => {
      this.alert.error('Hubo un error al procesar la solicitud');
      this.actualizandoDatos = false;
    })
  }

}
