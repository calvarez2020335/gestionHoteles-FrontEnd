import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { env } from 'src/environments/env';
import { Reservacion } from '../models/reservacion.model';

@Injectable({
  providedIn: 'root'
})
export class ReservacionesAdminhotelService {

  public url: String = env.urlApi;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) { }

  VerReservaciones(idHotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/VerReservaciones/'+ idHotel, {headers: headersToken})
  }


  reservacion(modeloReservacion: Reservacion , token , idHabitacion ): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloReservacion);
    return this._http.post(this.url+'/reservacion/'+ idHabitacion,parametros ,{headers: headersToken})

  }

  getReservacion(token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/VerReservacionesUser', { headers: headersToken})
  }

  cancelarReservacion(token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url+ '/cancelarReservacion', { headers: headersToken})
  }




}
