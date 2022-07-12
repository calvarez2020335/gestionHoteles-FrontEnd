import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environments/env';
import { Gasto } from '../models/gastosServicios.model';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  public url: String = env.urlApi;
  public headersVariable = new HttpHeaders().set(
    'Content-type',
    'application/json'
  );
  public token;
  public identidad;

  constructor(public _http: HttpClient) {}

  agregarServicio(idHotel, modeloServicio: Servicio,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloServicio);
    return this._http.post(
      this.url+'/registrarServicio/'+idHotel,
      parametros,
      { headers: headersToken }
    );
  }
  editarServicio(modeloServicio: Servicio,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloServicio);
    return this._http.put(
      this.url + '/editarServicio/' + modeloServicio._id,
      parametros,
      {
        headers: headersToken,
      }
    );
  }
  eliminarServicio(idServicio,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarServicio/'+idServicio, {
      headers: headersToken,
    });
  }
  verServicios(idHotel,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verServicios/' + idHotel, {
      headers: headersToken,
    });
  }
  getServiciosId(idServicio,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verServiciosId/' + idServicio, {
      headers: headersToken,
    });
  }
  agregarServicioHabitacion( modeloServicio: Servicio,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloServicio);
    return this._http.post(this.url + '/servicioHabitacion', parametros, {
      headers: headersToken,
    });
  }

  verGastos(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/VerServiciosUser', {
      headers: headersToken,
    });
  }
}
