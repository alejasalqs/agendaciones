import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {

  constructor(private http: HttpClient) {}
  baseURL = environment.apiURL + 'doctores';

  /**
   * Obtiene una lista con todos los doctores del endpoint.
   * @returns Observable
   */
  obtenerDoctores(params?: any)  {
    return this.http.get(this.baseURL, {params});
  }

  obtenerNombreDoctores() {
    return this.http.get(this.baseURL + "/nombres");
  }

  /**
   * Obtiene la información detallada de un Doctor mediante un ID.
   * @param id Identificador del Doctor que se desea consultar
   * @returns Observable
   */
  obtenerDoctoresID(id: any) {
    return this.http.get(this.baseURL + '/'+ id);
  }

  obtenerFoto(foto) {
    if(foto) {
      return environment.apiURL + "uploads/doctor/" + foto;
    }else {
      return environment.apiURL + "uploads/doctor/no-img.png";
    }
  }

  agregarDoctor(doctor: any) {
    return this.http.post(this.baseURL + '/', doctor);
  }

  /**
   * Edita la información de un doctor especificado por un id.
   * @param id Identificador del Doctor que se desea editar
   * @returns Observable
   */
  editarDoctor(doctor: any, id: any) {
    return this.http.put(this.baseURL + '/'+ id, doctor);
  }

  eliminarDoctor(doctor: any, id: any) {
    return this.http.post(this.baseURL + '/'+  id, doctor);
  }

  eliminarAtributosDoctor(atributo: string, idAtributo: string, idDoctor: number) {
    return this.http.delete(`${this.baseURL}/${atributo}/${idAtributo}/doctor/${idDoctor}`)
  }

  agregarAtributosDoctor(atributo: string, objeto) {
    return this.http.post(`${this.baseURL}/${atributo}`,objeto)
  }

  actualizarAtributosDoctor(atributo: string,idAtributo: string, idDoctor: number, objeto) {
    return this.http.put(`${this.baseURL}/${atributo}/${idAtributo}/doctor/${idDoctor}`,objeto)
  }

  returnQueryParams(parametros) {
    var first = true;
    var str = '';
    for (var key in parametros){
      if(first){
        str += `?${key}=${parametros[key]}`
        first = false
      } else {
        str += `&${key}=${parametros[key]}`
      }
    }
    return str;
  }
}
