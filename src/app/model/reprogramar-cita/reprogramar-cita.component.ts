import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from 'src/app/services/agenda.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-reprogramar-cita',
  templateUrl: './reprogramar-cita.component.html',
  styleUrls: ['./reprogramar-cita.component.css']
})
export class ReprogramarCitaComponent implements OnInit {

  @Input() eventId;
  @Input() detalleEvento;

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService, private alert: AlertsService) { }


  reprogramacionEvento;

  ngOnInit(): void {
    console.log(this.detalleEvento);
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

}
