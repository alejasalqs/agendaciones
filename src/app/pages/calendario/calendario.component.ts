import { Component, OnInit, ViewChild } from '@angular/core';
import { EventInput, Calendar } from "@fullcalendar/core";
import { FullCalendarComponent, CalendarOptions } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import { esLocale, frLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor() { }

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
  initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
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
    
  }

  ngAfterViewChecked() {
    //this.agregarClasesResponsive();
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
}
