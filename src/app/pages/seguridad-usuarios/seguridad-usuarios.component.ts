import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/services/compania.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seguridad-usuarios',
  templateUrl: './seguridad-usuarios.component.html',
  styleUrls: ['./seguridad-usuarios.component.css']
})
export class SeguridadUsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService,private router: Router, private auth: AuthService) { }

  usuarios = [];
  loading = false;

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.loading = true;
    this.usuariosService.obtenerUsuariosDeCompania(this.auth.obtenerDoctorLogeado().Compania).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.loading = false;
      //console.log(this.usuarios);
    });
  }

  irPerfilUsuario(id, tipoPerfil) {
    this.router.navigate(['/admin/seguridad/', id]);
  }

}
