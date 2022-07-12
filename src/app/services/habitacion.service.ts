import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Habitaciones } from '../models/habitaciones.model'
import { env } from 'src/environments/env';



@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  public url: String = env.urlApi;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) { }

  postHabitacion(idHotel, modeloHabitaciones: Habitaciones, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloHabitaciones);

    return this._http.post(this.url + '/registrarHabitacion/'+ idHotel, parametros, {headers: headersToken})
  }

  getHabitaciones(idHotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url+ '/verHabitaciones/'+ idHotel, {headers: headersToken})
  }

  getHabitacionId(idHabitacion, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url+'/verHabitacionId/'+ idHabitacion, {headers: headersToken})
  }

  updateHabitacion(modeloHabitacion: Habitaciones,token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloHabitacion);

    return this._http.put(this.url+'/editarHabitacion/'+ modeloHabitacion._id, parametros, { headers: headersToken});
  }

  deleteHabitacion(idHabitacion, token){
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.delete(this.url+'/eliminarHabitacion/'+ idHabitacion, { headers: headersToken})
  }

}
