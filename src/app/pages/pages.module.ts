import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PagesComponent } from './pages.component';

import { PAGES_ROUTES } from "./pages.routes.js";
import { ConfigAgendaComponent } from './config-agenda/config-agenda.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { LoadingComponent } from './loading/loading.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    AsideComponent,
    FooterComponent,
    PageHeaderComponent,
    DashboardComponent,
    CalendarioComponent,
    ConfigAgendaComponent,
    UsuariosComponent,
    SeguridadComponent,
    LoadingComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
