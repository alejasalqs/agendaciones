import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DoctoresService } from 'src/app/services/doctores.service';
import { CompaniaService } from 'src/app/services/compania.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {

  constructor(private auth: AuthService, private route: ActivatedRoute, private usuarios: UsuariosService) { }

  loading: boolean;

  modelContrasena = {
    contrasena:'',
    repetirNuevaContrasena:'',
    nuevaContrasena:''
  }

  IdDoctor;
  idCompania;

  correoUsuario;

  ngOnInit(): void {
    this.loading = false;
    this.obtenerParametros();
    this.obtenerCorreo();
  }

  obtenerParametros() {
    this.route.params.subscribe(params => this.IdDoctor = params["id"]);
  }

  obtenerCorreo() {
    this.usuarios.obtenerUsuariosDeCompaniaPorId(1, this.IdDoctor).subscribe((resp: any) => {
      console.log(resp);
      this.correoUsuario = resp.usuario.Correo;
      this.idCompania = resp.usuario.Compania;
    });
  }

  cambiarContrasena() {
    console.log(this.correoUsuario);
    if(this.modelContrasena.nuevaContrasena === '' || this.modelContrasena.contrasena === '' || this.modelContrasena.repetirNuevaContrasena === '') { console.log('Por favor llenar todos los campos'); return;};

    if (this.modelContrasena.nuevaContrasena !== this.modelContrasena.repetirNuevaContrasena){ console.log('Las contraseñas son diferentes'); return;}

    if(this.modelContrasena.nuevaContrasena !== this.modelContrasena.contrasena){
      this.auth.cambiarContrasena({ 
        Contrasena: this.modelContrasena.contrasena,
        NuevaContrasena: this.modelContrasena.nuevaContrasena,
        Correo: this.correoUsuario,
        IdCompania:  this.idCompania,
        IdUsuario: this.IdDoctor 
      })
    .subscribe((data: any) => console.log(data.mensaje,'Operación realizada con éxito')
    ,error => console.log(error.mensaje,'Error al realizar la operación'))
    } else {
      //this.toastr.error('La nueva contraseña debe ser diferente a la contraseña anterior','Error al realizar la operación');
    }
  }

}
