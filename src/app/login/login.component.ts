import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alert: AlertsService) { }

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
      this.router.navigate(["/admin/dashboard"]);
      this.loading = false;
    }, err => {
      this.alert.error('Crendeciales inválidas');
      this.loading = false;
    })
  }

}
