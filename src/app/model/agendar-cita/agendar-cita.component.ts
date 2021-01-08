import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  @Input() eventId;
  @Input() IdDoctor;

  @Output() seAgendo = new EventEmitter<boolean>();

  modelEvento = {
    Nombre: '',
    Apellidos: '',
    Cedula: '',
    Celular: '',
    Correo: '',
    MotivoCita: '',
    IdDoctor: 0
  };

  loading;

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService) {
    console.log(this.eventId);
    console.log(this.IdDoctor);
  }

  ngOnInit(): void {
    console.log(this.eventId);
    console.log(this.IdDoctor);
    this.loading = false;
  }

  agendar() {
    this.loading = true;
    this.modelEvento.IdDoctor = 1;
    console.log(this.modelEvento);
    this.agendaService.actualizarEvento( this.modelEvento,this.eventId).subscribe( (data: any) => {
    //this.fullcalendar.getApi().getEventById(this.selecteIDAgenda.toString()).remove();
    this.loading = false;
    this.activeModal.dismiss();
    this.seAgendo.emit(true);
    console.log('Esté atento a su correo electrónico o número telefónico para saber más detalles','Se ha agendado su cita correctamente')
    },
    error => console.log(error,'Error al momento de realizar la operación'))
  }
}
