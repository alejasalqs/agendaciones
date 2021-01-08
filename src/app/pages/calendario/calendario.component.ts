import { Component, OnInit, ViewChild } from '@angular/core';
import { EventInput, Calendar } from "@fullcalendar/core";
import { FullCalendarComponent, CalendarOptions } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import { esLocale, frLocale } from 'ngx-bootstrap/chronos';
import { AgendaService } from 'src/app/services/agenda.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor(private agendaService: AgendaService,private route: ActivatedRoute) { }

  @ViewChild('fullcalendar',{ static: false }) fullcalendar: FullCalendarComponent;

  IdDoctor;

  calendarEvents: EventInput[] = [];

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
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  //locales: [ esLocale, frLocale ],
  locale: 'es',
  timeZone: 'America/Costa_Rica',
};

  ngOnInit(): void {
    this.obtenerParametros();
    this.cargarEventos();
  }

  ngAfterViewChecked() {
    //this.agregarClasesResponsive();
  }

  obtenerParametros() {
    this.route.params.subscribe(params => this.IdDoctor = params["id"]);
  }

  agregarClasesResponsive(){
    let agregarClases = ["col-sm-12","col-lg-4","col-md-4","pt-2","d-flex", "justify-content-center"]
    document.getElementsByClassName('fc-header-toolbar')[0].classList.add("row");
    document.getElementsByClassName('fc-left')[0].classList.add(...agregarClases);
    document.getElementsByClassName('fc-center')[0].classList.add(...agregarClases);
    document.getElementsByClassName('fc-right')[0].classList.add(...agregarClases);
  }

  handleDateClick(arg,template) {
    //this.modalService.open(template);
  }

  eventClick(arg,template) {
    //this.detalleEvento = {};
    //this.agendaService.obtenerDetalleEvento(arg.id).subscribe((resp: any) => {
    //  this.detalleEvento = resp.detalle;
    //  const modalRef = this.modalService.open(template);
    //}, err => this.toastr.error('Error al obtener los datos','Error'))
  }

  cargarEventos() {
    this.agendaService.obtenerMetodosAgendados(this.IdDoctor).subscribe(
      (data: any) => {
        this.darFormatoFechaDDMMYYYY(data.eventos);
        for (let evento of data.eventos) { 
          evento.start = evento.start = new Date(evento.start);
          evento.end = evento.end = new Date(evento.end);
          evento.timezone = "UTC";
          this.calendarEvents.push(evento);
        }
        
      }
    );
  }

  async darFormatoFechaHora(fecha?: any,hora?: any, minutos?:any) {
    if (hora) {
      return `${fecha.year}/${fecha.month}/${fecha.day} ${hora}:${minutos}`
    } else {
      return `${fecha.year}/${fecha.month}/${fecha.day}`
    }
  }

  darFormatoFechaDDMMYYYY(obj) {
    try {
        for(var key of Object.keys(obj)){
            if(key.toLowerCase().includes('fecha')){
                obj[key] = new Date(obj[key]).toLocaleString();
                obj[key] = new Date(obj[key]);
            }
        }  
        return obj;
    } catch (err) {
        
    }
  }
}
