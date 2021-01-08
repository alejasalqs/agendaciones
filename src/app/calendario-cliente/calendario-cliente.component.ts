import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent, CalendarOptions, EventInput } from '@fullcalendar/angular';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-calendario-cliente',
  templateUrl: './calendario-cliente.component.html',
  styleUrls: ['./calendario-cliente.component.css']
})
export class CalendarioClienteComponent implements OnInit {

  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    console.log('hola');
    this.cargarEventos(1);
  }

  calendarEvents: EventInput[] = [];

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
  events: this.calendarEvents, // alternatively, use the `events` setting to fetch from a feed
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  //locales: [ esLocale, frLocale ],
  locale: 'es',
  timeZone: 'America/Costa_Rica',
};


ngAfterViewChecked() {
  //this.agregarClasesResponsive();
}

agregarClasesResponsive(){
  let agregarClases = ["col-sm-12","col-lg-6","col-md-6","pt-2","d-flex", "justify-content-center"]
  document.getElementsByClassName('fc-header-toolbar')[0].classList.add("row");
  document.getElementsByClassName('fc-left')[0].classList.add(...agregarClases);
  document.getElementsByClassName('fc-center')[0].classList.add(...agregarClases);
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
      console.log(this.calendarEvents);
    }
  );
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
