import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class FacturasService {
  public url : String = env.urlApi;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token;
  public identidad;

  constructor(public _http: HttpClient) {}
  crearFactura(token, idFactu): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/generarFactura/' + idFactu, {
      headers: headersToken,
    });
  }
  verFacturas(token, idHotel): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/VerFacturas/' + idHotel, {
      headers: headersToken,
    });
  }
  verFacturasId(token, idFactura): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/VerFacturasId/' + idFactura, {
      headers: headersToken,
    });
  }
  makePDF(token, idFactura): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/generarpdf/' + idFactura, {
      headers: headersToken,
    });
  }


  prueba(): Observable<any> {

    return this._http.get(this.url + '/prueba', {

    });

  }

}


