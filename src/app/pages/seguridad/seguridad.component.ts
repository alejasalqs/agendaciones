import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {

  constructor(private auth: AuthService) { }

  loading: boolean;

  modelContrasena = {
    contrasenaActual:'',
    repetirNuevaContrasena:'',
    nuevaContrasena:''
  }

  ngOnInit(): void {
    this.loading = false;
  }

  cambiarContrasena() {
    console.log(this.modelContrasena);
    this.loading = true;
    this.auth.cambiarContrasena(this.modelContrasena).subscribe(resp => {
      console.log(resp);
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    })
  }

}
