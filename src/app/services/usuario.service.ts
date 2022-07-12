import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { env } from 'src/environments/env';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url : String = env.urlApi;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public headersToken = new HttpHeaders({
    'Content Type': 'application/json',
    'Authorization': this.getToken()
  })

  public token;
  public identidad;

  constructor(public _http: HttpClient) { }

  RegistrarCliente(modeloUsuario: Usuario, token, formData) : Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url + '/registrarUsuario', parametros, {headers: headersToken});

  }

  RegistrarGerente(modeloUsuario: Usuario, token) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )

    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url + '/registrarGerente', parametros, {headers: headersToken});
  }

  login(usuario, obtenerToken = null): Observable<any> {

    if(obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, { headers: this.headersVariable });
  }

  getToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2
    } else {
      this.token = '';
    }

    return this.token;
  }

  clearToken(){
    localStorage.clear();

  }

  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }

  obtenerUsuario(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/verUsuarios', { headers: headersToken});
  }

  obtenerUsuarioId(idUser, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verUsuarioId/'+idUser, {headers: headersToken})

  }

  editarUsuario( modeloUser: Usuario, token ): Observable<any>{
    let parametros = JSON.stringify(modeloUser);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarUsuario/'+ modeloUser._id, parametros, { headers: headersToken } )
  }

  updateUser(id, params, token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.put(this.url +`/editarUsuario/`+id, params ,{ headers: headersToken});
  }

  EliminaUsuario( idUser, token ): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url +`/eliminarUsuario/`+idUser, { headers: headersToken});
  }

  verGerentes(token) : Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url +`/verAdminHoteles`, { headers: headersToken});
  }

}
