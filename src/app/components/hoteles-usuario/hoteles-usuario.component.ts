import {  Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model'
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-hoteles-usuario',
  templateUrl: './hoteles-usuario.component.html',
  styleUrls: ['./hoteles-usuario.component.scss'],
  providers: [HotelService, UsuarioService]
})
export class HotelesUsuarioComponent implements OnInit {

  public hotelModelGet: Hotel;
  public token: any;
  public buscarHotel;
  public buscarDireccion;

  constructor(public _hotelService: HotelService, public _usuarioService: UsuarioService) {
    this.token = this._usuarioService.getToken();
   }

  ngOnInit(): void {
    this.getHotelesUsuario()
  }

  getHotelesUsuario(){
    this._hotelService.VerHoteles().subscribe({
      next:(response: any)=>{
        this.hotelModelGet = response.Hoteles;
      }
    })
  }

}
