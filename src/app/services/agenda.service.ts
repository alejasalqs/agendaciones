import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class AgendaService {

  constructor(private http: HttpClient) { }
  baseURL = environment.apiURL + 'agenda/';

  obtenerMetodosAgenda(id) {
    return this.http.get(this.baseURL + id);
  }

  obtenerMetodosAgendados(id) {
    const params = new HttpParams().set('agendados', '123');
    
    return this.http.get(this.baseURL + id ,{
      params
    });
  }
  obtenerDetalleEvento(id){
    return this.http.get(this.baseURL + "detalle/" + id);
  }

  crearEventoAgenda(evento) {
    return this.http.post(this.baseURL, evento);
  }

  actualizarEvento(evento, id) {
    return this.http.put(this.baseURL + id, evento)
  }

  llenarDatos(config: any) {
    return this.http.post(this.baseURL + 'llenardatos', config);
  }

  configurarDiasLaborales(dias: any) {
    return this.http.post(this.baseURL + "/dias", dias);
  }

  configurarHoras(horas: any) {
    return this.http.post(this.baseURL + "/configurarhoras", horas);
  }

  obtenerDiasLaborales() {
    return this.http.get(this.baseURL + "/diaslaborales");
  }

  obtenerHoras(id) {
    return this.http.get(this.baseURL + "/horas/" + id);
  }

  desactivarHoras(idDoctor, idHora) {
    return this.http.delete(this.baseURL + "/horas/" + idDoctor + '/' + idHora);
  }

  cancelarCita(id: string | number) {
    return this.http.delete(this.baseURL + id);
  }

  reprogramarCita(idAgenda: string | number, idDoctor: string | number, reprogramacion: any) {
    return this.http.post(this.baseURL + 'reprogramar/' + idDoctor + '/' + idAgenda, reprogramacion);
  }
}
