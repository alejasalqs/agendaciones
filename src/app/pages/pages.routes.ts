import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ConfigAgendaComponent } from './config-agenda/config-agenda.component';

const pagesRoutes: Routes = [
  {
    path: "admin",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { titulo: "Dashboard" },
      },
      { 
        path: "agenda",
        component: CalendarioComponent,
        data: { titulo: "Agenda" },
      },
      { 
        path: "usuarios",
        component: UsuariosComponent,
        data: { titulo: "Usuarios" },
      },
      { 
        path: "configurar-agenda",
        component: ConfigAgendaComponent,
        data: { titulo: "Configurar Agenda" },
      },
      { 
        path: "seguridad",
        component: SeguridadComponent,
        data: { titulo: "Seguridad" },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: "**", component: DashboardComponent }
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
