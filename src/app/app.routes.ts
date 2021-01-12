import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { CalendarioClienteComponent } from './calendario-cliente/calendario-cliente.component';

const ROUTES: Routes = [
  { path: "login", component: LoginComponent},
  { path: "recuperar-contraseña", component: RecoverPasswordComponent},
  { path: "agenda/:compania/:agenda", component: CalendarioClienteComponent},
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: NoPageFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
