import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';


@Component({
  selector: 'app-config-agenda',
  templateUrl: './config-agenda.component.html',
  styleUrls: ['./config-agenda.component.css']
})
export class ConfigAgendaComponent implements OnInit {

    // cargadores
    cargandoDias = false;
    cargandoHoras = false;
  
    IdDoctor;

  constructor(private agendaService: AgendaService,
    private auth: AuthService,
    private alert: AlertsService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.cargandoDias = false;
      this.cargandoHoras = false;
    }


  ngOnInit() {
    this.cargandoDias = false;
    this.cargandoHoras = false;
    this.obtenerParametros();
    this.obtenerHoras();
  }

  obtenerParametros() {
    this.route.params.subscribe(params => {
      this.IdDoctor = params["id"]
      this.dias = [
        {Dia: 'Lunes', Trabajo: false, IdDoctor: this.IdDoctor},
        {Dia: 'Martes', Trabajo: false, IdDoctor: this.IdDoctor},
        {Dia: 'Miércoles', Trabajo: false, IdDoctor: this.IdDoctor},
        {Dia: 'Jueves', Trabajo: false, IdDoctor: this.IdDoctor},
        {Dia: 'Viernes', Trabajo: false, IdDoctor: this.IdDoctor},
        {Dia: 'Sábado', Trabajo: false, IdDoctor: this.IdDoctor},
        {Dia: 'Domingo', Trabajo: false, IdDoctor: this.IdDoctor},
      ];
    });
  }

  obtenerHoras () {
    this.agendaService.obtenerHoras(this.IdDoctor).subscribe((resp: any) => {
      this.horasExcluidas = resp.horas;
      //console.log(this.horasExcluidas);
    })
  }

  config: any = {
    
  };

  horas: any = {};

  horasExcluidas: any = {};

  dias: any = [
    {Dia: 'Lunes', Trabajo: false, IdDoctor: this.IdDoctor},
    {Dia: 'Martes', Trabajo: false, IdDoctor: this.IdDoctor},
    {Dia: 'Miércoles', Trabajo: false, IdDoctor: this.IdDoctor},
    {Dia: 'Jueves', Trabajo: false, IdDoctor: this.IdDoctor},
    {Dia: 'Viernes', Trabajo: false, IdDoctor: this.IdDoctor},
    {Dia: 'Sábado', Trabajo: false, IdDoctor: this.IdDoctor},
    {Dia: 'Domingo', Trabajo: false, IdDoctor: this.IdDoctor},
  ];

  checkCheckBoxvalue(dia){
    dia.Trabajo = !dia.Trabajo;
  }

  async configurar() {
    this.config.FechaInicial = await this.darFormatoFechaHora(this.config.FechaInicial,this.config.Hora)
    this.config.FechaFinal = await this.darFormatoFechaHora(this.config.FechaFinal)
    this.config.IdDoctor = this.IdDoctor;
    this.agendaService.llenarDatos(this.config).subscribe(data => {
      this.router.navigate(["/admin/configurar-agenda-usuarios"]);
      this.alert.success('Se ha guardado la configuración');
    },err => this.alert.error(err,'Hubo un problema al realizar la operación'));
  }

  configurarDias(){  
    this.cargandoDias = true;
    this.agendaService.configurarDiasLaborales(this.dias).subscribe(resp => {
      this.cargandoDias = false;
      this.alert.success('Operación realizada con éxito');
    }, err => {
      this.cargandoDias = false;
      this.alert.error('Hubo un error al realizar la operación')
    })
  }

  configurarHoras() {
    this.cargandoHoras = true;
    this.horas.HoraInicial = this.horas.HoraInicial + ':' + this.horas.MinutoInicial
    this.horas.HoraFinal = this.horas.HoraFinal + ':' + this.horas.MinutoFinal
    this.horas.idDoctor = this.IdDoctor;
    delete this.horas.MinutoInicial
    delete  this.horas.MinutoFinal
    this.agendaService.configurarHoras(this.horas).subscribe(resp => {
      this.alert.success('Operación realizada con éxito');
      this.horasExcluidas.push(this.horas)
      //console.log(this.horasExcluidas);
      this.horas = {};
      this.horas = false;
    }, err => this.alert.error('Hubo un error al realizar la operación'))
  }

  desactivarHora(idHora) {
    this.agendaService.desactivarHoras(this.IdDoctor, idHora)
    .subscribe((resp: any) => {
      this.horasExcluidas = this.horasExcluidas.filter(h => h.idHora !== idHora);
    })
  }


  async darFormatoFechaHora(fecha?: any,hora?: any) {
    if (hora) {
      return `${fecha.year}/${fecha.month}/${fecha.day} ${hora}`
    } else {
      return `${fecha.year}/${fecha.month}/${fecha.day}`
    }
  }
}
