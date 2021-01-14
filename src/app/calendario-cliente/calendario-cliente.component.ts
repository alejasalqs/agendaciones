import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent, CalendarOptions, EventInput } from '@fullcalendar/angular';
import { AgendaService } from '../services/agenda.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendarCitaComponent } from '../model/agendar-cita/agendar-cita.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { CompaniaService } from '../services/compania.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-calendario-cliente',
  templateUrl: './calendario-cliente.component.html',
  styleUrls: ['./calendario-cliente.component.css']
})
export class CalendarioClienteComponent implements OnInit {

  constructor(private agendaService: AgendaService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private alert: AlertsService,
              private companiaService: CompaniaService,
              private router: Router
              ) { }


  calendarEvents: EventInput[] = [];

  IdDoctor;
  compania;

  usuarios = [];
  usuarioSeleccionado;
  loading = false;

  @ViewChild('fullcalendar',{ static: false }) fullcalendar: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  buttonText: {
    today:    'Hoy',
    month:    'Mes',
    week:     'Semana',
    day:      'Día',
    list:     'Lista'
  },
  initialView: 'dayGridMonth',
  events: this.calendarEvents, // alternatively, use the `events` setting to fetch from a fee
  weekends: true,
  //editable: true,
  //selectable: true,
  //selectMirror: true,
  dayMaxEvents: true,
  //locales: [ esLocale, frLocale ],
  locale: 'es',
  timeZone: 'America/Costa_Rica',
  eventClick: (info) => {
    this.open(info.event.id);
  }
};

ngOnInit(): void {
  this.obtenerParametros();
}

open(id) {
  const modalRef = this.modalService.open(AgendarCitaComponent);
  modalRef.componentInstance.eventId = id;
  modalRef.componentInstance.IdDoctor = this.IdDoctor;
}

obtenerParametros() {
  this.route.params.subscribe(params => {
    //console.log(params);
    this.IdDoctor = params["agenda"];
    this.compania = params["compania"];
    this.obtenerUsuarios(this.compania);
    this.cargarEventos(this.IdDoctor);
  });
}

obtenerUsuarios(compania) {
  this.loading = true;
  this.companiaService.obtenerDoctoresCompania(compania).subscribe((resp: any) => {
    this.usuarios = resp.mensaje;
    this.loading = false;
    console.log(this.usuarios);
    this.usuarioSeleccionado = this.usuarios.filter(u => u.Id == this.IdDoctor);
  }, err => this.alert.error('Hubo un error al obtener los datos'));
}

agregarClasesResponsive(){
  let agregarClases = ["col-sm-12","col-lg-6","col-md-6","pt-2","d-flex", "justify-content-center"]
  document.getElementsByClassName('fc-header-toolbar')[0].classList.add("row");
  document.getElementsByClassName('fc-left')[0].classList.add(...agregarClases);
  document.getElementsByClassName('fc-center')[0].classList.add(...agregarClases);
}

cambiarAgenda(id) {
  if (Number(this.IdDoctor) === Number(id)) return;
  this.eliminarEventos().then( resp => {
    this.usuarioSeleccionado = this.usuarios.filter(u => u.Id == id);
    console.log(this.usuarioSeleccionado);
    this.router.navigate([`/agenda/${this.compania}/${id}`]);
  });
}

cargarEventos(id) {
  this.agendaService.obtenerMetodosAgenda(id).subscribe(
    (data: any) => {
      this.darFormatoFechaDDMMYYYY(data.eventos);
      for (let evento of data.eventos) {
        evento.start = evento.start = new Date(evento.start);
        evento.end = evento.end = new Date(evento.end);
        evento.timezone = "UTC";
        this.calendarEvents.push(evento);
      }
      this.fullcalendar.getApi().addEventSource(this.calendarEvents);
      this.fullcalendar.getApi().refetchEvents();
      this.fullcalendar.getApi().render();
     // console.log(this.calendarEvents);
    }, err => {
     // console.log(err);
      this.alert.error('Hubo un error al procesar la solicitud');
    }
  );
}

eliminarEventos() {
  return new Promise((resolve,reject) => {
    for (let evento of this.calendarEvents) {
      const calendarEvent = this.fullcalendar.getApi().getEventById(evento.id);
      //console.log(calendarEvent);
      calendarEvent.remove();
    }
    this.fullcalendar.getApi().removeAllEvents;
    this.calendarEvents = [];
    this.fullcalendar.getApi().render();
    resolve();
  });
}

darFormatoFechaDDMMYYYY(obj) {
  try {
      for(var key of Object.keys(obj)){
          if(key.toLowerCase().includes('fecha')){
              obj[key] = new Date(obj[key]).toLocaleString();
              console.log(obj[key]);
              obj[key] = new Date(obj[key]);
          }
      }  
      return obj;
  } catch (err) {
      console.log(err);
  }
}
}
