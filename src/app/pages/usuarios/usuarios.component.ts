import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/services/compania.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private companiaService: CompaniaService,private router: Router) { }

  usuarios = [];
  loading = false;

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.loading = true;
    this.companiaService.obtenerUsuariosCompania(1).subscribe((resp: any) => {
      this.loading = false;
      this.usuarios = resp.mensaje;
      //console.log(this.usuarios);
    })
  }

  irPerfilUsuario(id, tipoPerfil) {
    this.router.navigate(['/admin/perfil-usuario/', id]);
  }

}
