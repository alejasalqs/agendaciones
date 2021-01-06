import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/services/compania.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguridad-usuarios',
  templateUrl: './seguridad-usuarios.component.html',
  styleUrls: ['./seguridad-usuarios.component.css']
})
export class SeguridadUsuariosComponent implements OnInit {

  constructor(private companiaService: CompaniaService,private router: Router) { }

  usuarios = [];
  loading = false;

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.loading = true;
    this.companiaService.obtenerUsuariosCompania(1).subscribe((resp: any) => {
      this.usuarios = resp.mensaje;
      this.loading = false;
      //console.log(this.usuarios);
    });
  }

  irPerfilUsuario(id, tipoPerfil) {
    this.router.navigate(['/admin/perfil-usuario/', id]);
  }

}
