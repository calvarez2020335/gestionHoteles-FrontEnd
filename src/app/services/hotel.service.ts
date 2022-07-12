import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Hotel } from '../models/hotel.model'
import { env } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  public url: String = env.urlApi;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) {}

  RegistrarHotel(modeloHotel: Hotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloHotel);

    return this._http.post(this.url + '/RegistrarHotel', parametros, {
      headers: headersToken,
    });
  }

  VerHoteles(): Observable<any> {
    return this._http.get(this.url + '/verHoteles');
  }

  VerHotelesAdmin(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHotelesAdmin', {
      headers: headersToken,
    });
  }

  verHotelesSuperAdmin(token, idUsuario): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHotelesAdmin/' + idUsuario, {
      headers: headersToken,
    });
  }

  VerHotelId(idHotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHotelesId/' + idHotel, {
      headers: headersToken,
    });
  }

  editarHotel(modeloHotel: Hotel, token): Observable<any> {
    let parametros = JSON.stringify(modeloHotel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(
      this.url + '/editarHotel/' + modeloHotel._id,
      parametros,
      { headers: headersToken }
    );
  }

  deleteHotel(idHotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarHotel/' + idHotel, {
      headers: headersToken,
    });
  }

  habitacionesDisponibles(idHotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(
      this.url + '/disponibilidadHabitacionesNumero/' + idHotel,
      { headers: headersToken }
    );
  }

  hotelSolicitado(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/HotelMasSolicitado', {
      headers: headersToken,
    });
  }
}
