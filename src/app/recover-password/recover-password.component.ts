import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(private auth: AuthService) { }

  correo;

  loading;

  ngOnInit(): void {
    this.loading = false;
  }

  recoverPassword() {
    this.loading = true;
    this.auth.recuperarContrasena(this.correo).subscribe(resp => {
      console.log(resp);
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

}
