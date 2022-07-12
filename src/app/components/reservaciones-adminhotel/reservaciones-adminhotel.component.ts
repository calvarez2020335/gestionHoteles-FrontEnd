import { Component, OnInit } from '@angular/core';
import { Reservacion } from 'src/app/models/reservacion.model'
import { UsuarioService } from '../../services/usuario.service';
import { ReservacionesAdminhotelService } from '../../services/reservaciones-adminhotel.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reservaciones-adminhotel',
  templateUrl: './reservaciones-adminhotel.component.html',
  styleUrls: ['./reservaciones-adminhotel.component.scss'],
  providers: [ReservacionesAdminhotelService, UsuarioService]
})
export class ReservacionesAdminhotelComponent implements OnInit {

  public reservacionAdminHotelModelGet: Reservacion;
  public reservacionAdminHotelModelPost: Reservacion;
  public reservacionAdminHotelModelGetId: Reservacion;
  public token;
  public idHotel
  public buscarUsuario

  constructor(
    public _reservacionAdminHotel: ReservacionesAdminhotelService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.reservacionAdminHotelModelPost = new Reservacion('','','','','','','','');
    this.reservacionAdminHotelModelGetId = new Reservacion('','','','','','','','');
    this.token = this._usuarioService.getToken()
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getReservacionesAdminHotel(dataRuta.get('idHotel'))
      this.idHotel = dataRuta.get('idHotel')
    })
  }

  getReservacionesAdminHotel(idHotel){
    this._reservacionAdminHotel.VerReservaciones(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.reservacionAdminHotelModelGet = response.mensaje
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }



}
