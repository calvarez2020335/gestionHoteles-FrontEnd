import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { env } from 'src/environments/env';
import { historial } from 'src/app/models/historial.model'

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  public url : String = env.urlApi;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) { }


  VerHistorial(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/VerHistorial', {headers: headersToken})
  }

  // CrearEvento(modeloEvento: Evento, token, idHotel): Observable<any>{
  //   let headersToken = this.headersVariable.set('Authorization', token);
  //   let parametros = JSON.stringify(modeloEvento);

  //   return this._http.post(this.url + '/crearEvento/'+ idHotel, parametros, {headers: headersToken})
  // }

  // EditarEvento(modeloEvento: Evento, token): Observable<any> {
  //   let parametros = JSON.stringify(modeloEvento);
  //   let headersToken = this.headersVariable.set('Authorization',token);

  //   return this._http.put(this.url + '/editarEvento/' + modeloEvento._id, parametros, {headers: headersToken})
  // }

  // EliminarEvento(idEvento, token): Observable<any> {
  //   let headersToken = this.headersVariable.set('Authorization', token);
  //   return this._http.delete(this.url + '/eliminarEvento/' + idEvento, {headers: headersToken})
  // }

  // VerEventos(idHotel, token): Observable<any> {
  //   let headersToken = this.headersVariable.set('Authorization', token);
  //   return this._http.get(this.url+ '/verEventos/'+idHotel, {headers: headersToken})
  // }

  // VerEventosId(idEvento, token): Observable<any>{
  //   let headersToken = this.headersVariable.set('Authorization', token);
  //   return this._http.get(this.url+ '/verEventosId/' + idEvento, {headers: headersToken})
  // }

}
