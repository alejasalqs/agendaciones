import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuariosService, 
              private route: ActivatedRoute, 
              private alert: AlertsService,
              private router: Router,
              private fs: FileUploadService
              ) { }

  IdDoctor;
  idCompania;
  modelUsuario;
  actualizandoDatos;
  subiendoImagen;
  foto;
  public imagenSubir: File;

  ngOnInit(): void {
    this.actualizandoDatos = false;
    this.subiendoImagen = false;
    this.obtenerParametros();
    this.obtenerInformacionUsuario();
  }

  obtenerParametros() {
    this.route.params.subscribe(params => this.IdDoctor = params["id"]);
  }


  obtenerInformacionUsuario() {
    this.usuarioService.obtenerUsuariosDeCompaniaPorId(1, this.IdDoctor).subscribe((resp: any) => {
      this.modelUsuario = resp.usuario;
      //console.log(this.modelUsuario);
    })
  }

  actualizarPerfil() {
    this.actualizandoDatos = true;
    delete this.modelUsuario.Id;
    delete this.modelUsuario.Compania;
    delete this.modelUsuario.RolUsuario;
    delete this.modelUsuario.Correo;
    delete this.modelUsuario.FechaNacimiento;

    this.usuarioService.actualizarPerfilUsuario(this.IdDoctor,this.modelUsuario).subscribe(resp => {
      this.actualizandoDatos = false;
      this.router.navigate(["/admin/usuarios"]);
      this.alert.success('Operación realizada con éxito');
    }, err => {
      this.alert.error('Hubo un error al procesar la solicitud');
      this.actualizandoDatos = false;
    })
  }

  cambiarImg(file:File) {
    this.imagenSubir = file;
  }

  subirImagen() {
    this.subiendoImagen = true;
    this.fs.actualizarFoto(this.imagenSubir,'doctor',this.IdDoctor)
    .then(img => {
      console.log(img) 
      this.subiendoImagen = false;
    });
  }

}
