import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  baseURL = environment.apiURL + 'usuarios/';

  obtenerUsuariosDeCompania(id) {
    return this.http.get(this.baseURL + id);
  }

  obtenerUsuariosDeCompaniaPorId(idCompania, idUsuario) {
    return this.http.get(this.baseURL + idCompania + '/' +idUsuario );
  }

  actualizarPerfilUsuario(id,usuario) {
    return this.http.put(this.baseURL + id, usuario);
  }
}
