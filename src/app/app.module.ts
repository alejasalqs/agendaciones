import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from "ngx-toastr";

import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { APP_ROUTES } from './app.routes';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { CalendarioClienteComponent } from './calendario-cliente/calendario-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgendarCitaComponent } from './model/agendar-cita/agendar-cita.component';
import { InformacionCitaComponent } from './model/informacion-cita/informacion-cita.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
])

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoPageFoundComponent,
    RecoverPasswordComponent,
    CalendarioClienteComponent,
    AgendarCitaComponent,
    InformacionCitaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }), // ToastrModule added
    FullCalendarModule,
    FormsModule,
    APP_ROUTES,
    PagesModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
