import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/services/compania.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-agenda-usuarios',
  templateUrl: './config-agenda-usuarios.component.html',
  styleUrls: ['./config-agenda-usuarios.component.css']
})
export class ConfigAgendaUsuariosComponent implements OnInit {

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
    this.router.navigate(['/admin/configurar-agenda/', id]);
  }


}
