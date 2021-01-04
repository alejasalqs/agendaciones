import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const ROUTES: Routes = [
  { path: "login", component: LoginComponent},
  { path: "**", component: NoPageFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
