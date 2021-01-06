import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor(private http: HttpClient) { }
  baseURL = environment.apiURL + 'compania/';

  obtenerUsuariosCompania(id) {
    return this.http.get(this.baseURL + "usuarios/" + id);
  }

  obtenerDoctoresCompania(id) {
    return this.http.get(this.baseURL + "doctores/" + id);
  }
}
