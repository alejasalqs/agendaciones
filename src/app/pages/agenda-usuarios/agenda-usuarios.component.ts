import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/services/compania.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-agenda-usuarios',
  templateUrl: './agenda-usuarios.component.html',
  styleUrls: ['./agenda-usuarios.component.css']
})
export class AgendaUsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService,private router: Router) { }

  usuarios = [];
  loading = false;

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.loading = true;
    this.usuariosService.obtenerUsuariosDeCompania(1).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.loading = false;
      //console.log(this.usuarios);
    });
  }

  irPerfilUsuario(id, tipoPerfil) {
    this.router.navigate(['/admin/agenda/', id]);
  }

}
