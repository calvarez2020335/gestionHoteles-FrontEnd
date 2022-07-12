import { Component, OnInit } from '@angular/core';
import { Gasto } from 'src/app/models/gastosServicios.model';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ver-gastos',
  templateUrl: './ver-gastos.component.html',
  styleUrls: ['./ver-gastos.component.scss'],
  providers: [ServicioService]
})
export class VerGastosComponent implements OnInit {
  public gastoModelGet: Gasto;
  public token;
  constructor(
    public _servicioService: ServicioService,
    public _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.getToken()
   }

  ngOnInit(): void {
    this.getGastos();
  }

  getGastos(){
    this._servicioService.verGastos(this.token).subscribe({
      next:(response: any)=> {
        this.gastoModelGet = response.mensaje;
      }
    })
  }

}
