import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const ROUTES: Routes = [
  { path: "login", component: LoginComponent},
  { path: "recuperar-contraseña", component: RecoverPasswordComponent},
  { path: "**", component: NoPageFoundComponent },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
