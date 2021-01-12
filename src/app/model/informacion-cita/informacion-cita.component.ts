import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AgendaService } from 'src/app/services/agenda.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ReprogramarCitaComponent } from '../reprogramar-cita/reprogramar-cita.component';
import { RecordatoriosService } from 'src/app/services/recordatorios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-informacion-cita',
  templateUrl: './informacion-cita.component.html',
  styleUrls: ['./informacion-cita.component.css']
})
export class InformacionCitaComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, 
              private agendaService: AgendaService, 
              private alert: AlertsService, 
              private modalService: NgbModal,
              private recordatorioService: RecordatoriosService,
              private authService: AuthService) { }

  @Input() eventId;
  @Input() IdDoctor;

  detalleEvento;

  reprogramacionEvento = {
    start:'',
    endDate:'',
    HoraInicial:'',
    HoraFinal:'',
    MinutoFinal:'',
    MinutoInicial:''
  };

  mostrarReprogramarCita = false;

  ngOnInit(): void {
    this.obtenerDetalleEvento();
  }

  obtenerDetalleEvento() {
    this.agendaService.obtenerDetalleEvento(this.eventId).subscribe((resp: any) => {
      this.detalleEvento = resp.detalle;
    }, err => this.alert.error('Error al obtener los datos','Error'))
  }

  cancelarCita(id: string){
    this.agendaService.cancelarCita(id).subscribe(resp => {
      this.alert.info('Se ha cancelado la cita');
      //this.fullcalendar.getApi().getEventById(id).remove();
    })
  }

  reprogramarCita(evento: any){
    const modalRef = this.modalService.open(ReprogramarCitaComponent);
    modalRef.componentInstance.detalleEvento = evento;
  }

  enviarRecordatorio(cita: any) {
    this.recordatorioService.enviarRecordatorio(cita).subscribe((resp: any) => {
      this.alert.success(resp.mensaje);
    })
  }

  async guardarReprogramacionCita(id: string){

    if ( this.reprogramacionEvento.start === undefined ) {
      this.alert.error('Por favor llenar todos los datos');
      return;
    }

    console.log(this.reprogramacionEvento);

    this.reprogramacionEvento.endDate = this.reprogramacionEvento.start;
    this.reprogramacionEvento.start = await this.darFormatoFechaHora(this.reprogramacionEvento.start, this.reprogramacionEvento.HoraInicial,this.reprogramacionEvento.MinutoInicial)
    this.reprogramacionEvento.endDate = await this.darFormatoFechaHora(this.reprogramacionEvento.endDate, this.reprogramacionEvento.HoraFinal,this.reprogramacionEvento.MinutoFinal)
    delete this.reprogramacionEvento.HoraInicial;
    delete this.reprogramacionEvento.HoraFinal;
    delete this.reprogramacionEvento.MinutoInicial;
    delete this.reprogramacionEvento.MinutoFinal;

    console.log(this.reprogramacionEvento);
    this.agendaService.reprogramarCita(id,this.IdDoctor,this.reprogramacionEvento).subscribe(resp => {
      //this.fullcalendar.getApi().getEventById(id).remove();
      //this.calendarEvents = [];
      this.reprogramacionEvento = {start:'',
      endDate:'',
      HoraInicial:'',
      HoraFinal:'',
      MinutoFinal:'',
      MinutoInicial:''};
      //this.cargarEventos();
      this.alert.success('Se ha reprogramado la cita exitosamente, por favor recargue el sistema para reflejar el cambio.');
      this.activeModal.dismiss();
    }, err => this.alert.error('Ha ocurrido un error al realizar la operación'));
  }

  async darFormatoFechaHora(fecha?: any,hora?: any, minutos?:any) {
    if (hora) {
      return `${fecha.year}/${fecha.month}/${fecha.day} ${hora}:${minutos}`
    } else {
      return `${fecha.year}/${fecha.month}/${fecha.day}`
    }
  }
}
