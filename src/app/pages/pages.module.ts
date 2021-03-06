import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
import { NoDataComponent } from './no-data/no-data.component';
import { SeguridadUsuariosComponent } from './seguridad-usuarios/seguridad-usuarios.component';
import { AgendaUsuariosComponent } from './agenda-usuarios/agenda-usuarios.component';
import { ConfigAgendaUsuariosComponent } from './config-agenda-usuarios/config-agenda-usuarios.component';
import { SoporteComponent } from './soporte/soporte.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
])

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
    PerfilUsuarioComponent,
    NoDataComponent,
    SeguridadUsuariosComponent,
    AgendaUsuariosComponent,
    ConfigAgendaUsuariosComponent,
    SoporteComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }), // ToastrModule added
    FullCalendarModule,
    FormsModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
