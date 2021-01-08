import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-informacion-cita',
  templateUrl: './informacion-cita.component.html',
  styleUrls: ['./informacion-cita.component.css']
})
export class InformacionCitaComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService) { }

  @Input() eventId;

  detalleEvento;

  ngOnInit(): void {
    this.obtenerDetalleEvento();
  }

  obtenerDetalleEvento() {
    this.agendaService.obtenerDetalleEvento(this.eventId).subscribe((resp: any) => {
      this.detalleEvento = resp.detalle;
    }, err => console.log('Error al obtener los datos','Error'))
  }

  cancelarCita(id: string){
    this.agendaService.cancelarCita(id).subscribe(resp => {
      console.log('Se ha cancelado la cita');
      //this.fullcalendar.getApi().getEventById(id).remove();
    })
  }

  reprogramarCita(id: string){
    //const modalRef = this.modalService.open(template);
  }

  async guardarReprogramacionCita(id: string, modal: any){

    //if ( this.reprogramacionEvento.start === undefined ) {
    //  this.toastr.error('Por favor llenar todos los datos');
    //  return;
    //}

    //this.reprogramacionEvento.endDate = this.reprogramacionEvento.start;
    //this.reprogramacionEvento.start = await this.darFormatoFechaHora(this.reprogramacionEvento.start, this.reprogramacionEvento.HoraInicial,this.reprogramacionEvento.MinutoInicial)
    //this.reprogramacionEvento.endDate = await this.darFormatoFechaHora(this.reprogramacionEvento.endDate, this.reprogramacionEvento.HoraFinal,this.reprogramacionEvento.MinutoFinal)
    //delete this.reprogramacionEvento.HoraInicial;
    //delete this.reprogramacionEvento.HoraFinal;
    //delete this.reprogramacionEvento.MinutoInicial;
    //delete this.reprogramacionEvento.MinutoFinal;
    //this.agendaService.reprogramarCita(id,this.authService.obtenerDoctorLogeado().IdDoctor,this.reprogramacionEvento).subscribe(resp => {
    //  this.fullcalendar.getApi().getEventById(id).remove();
    //  this.calendarEvents = [];
    //  this.reprogramacionEvento = {start:'',
    //  endDate:'',
    //  HoraInicial:'',
    //  HoraFinal:'',
    //  MinutoFinal:'',
    //  MinutoInicial:''};
    //  this.cargarEventos();
    //  this.toastr.success('Se ha reprogramado la cita exitosamente');
    //  //modal.dismiss();
    //}, err => this.toastr.error('Ha ocurrido un error al realizar la operación'));
  }

  enviarRecordatorio(cita: any) {
    //this.recordatorioService.enviarRecordatorio(cita).subscribe((resp: any) => {
    //  this.toastr.success(resp.mensaje);
    //})
  }

}
