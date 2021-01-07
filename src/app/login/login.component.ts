import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  model = {
    correo: '',
    contrasena: ''
  };

  loading;

  ngOnInit(): void {
    this.loading = false;
  }

  login(){
    this.loading = true;
    this.authService.login(this.model,'usuario').subscribe(
      () => {
      console.log('Credenciales válides');
      this.router.navigate(["/admin/dashboard"]);
      this.loading = false;
    }, err => {
      console.log('Crendeciales inválidas');
      this.loading = false;
    })
  }

}
