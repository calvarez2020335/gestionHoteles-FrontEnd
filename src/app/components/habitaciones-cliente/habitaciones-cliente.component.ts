import { Component, OnInit } from '@angular/core';
import { Habitaciones } from 'src/app/models/habitaciones.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ReservacionesAdminhotelService } from '../../services/reservaciones-adminhotel.service'
import { Reservacion } from '../../models/reservacion.model';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habitaciones-cliente',
  templateUrl: './habitaciones-cliente.component.html',
  styleUrls: ['./habitaciones-cliente.component.scss'],
  providers: [UsuarioService, HabitacionService, ReservacionesAdminhotelService]
})
export class HabitacionesClienteComponent implements OnInit {

  public habitacionModelGetCliente: Habitaciones;
  public reservacionModelPost: Reservacion;
  public habitacionModelGetId: Habitaciones;
  public idHotel;
  public token;

  constructor(
    public _habitacionService: HabitacionService,
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public _reservacion: ReservacionesAdminhotelService
  ) {
    this.token = this._usuarioService.getToken();
    this.reservacionModelPost = new Reservacion('', '', '', '', '', '', '','');
    this.habitacionModelGetId = new Habitaciones('', 0,'', '', 0, false, '','');
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getHabitacionesCliente(dataRuta.get('idHotel'))
      this.idHotel = dataRuta.get('idHotel')
    })
  }

  getHabitacionesCliente(idHotel) {
    this._habitacionService.getHabitaciones(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.habitacionModelGetCliente = response.habitaciones;
      },
      error: (err) => {
      }
    })
  }

  obtenerHabitacionId(idHabitacion){
    this._habitacionService.getHabitacionId(idHabitacion, this.token).subscribe({
      next: (response: any) => {
        this.habitacionModelGetId = response.habitacion;
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }


  reservacion() {
    this._reservacion.reservacion(this.reservacionModelPost , this.token,this.habitacionModelGetId._id  ).subscribe({
      next: (response: any) => {
        this.reservacionModelPost.CorreoReservacion = '';
        this.reservacionModelPost.FechaEntrada = '';
        this.reservacionModelPost.FechaSalida = '';
        this.reservacionModelPost.habitacion = '';
        this.reservacionModelPost.usuario = '';
        this.reservacionModelPost.hotel = '';
        this.getHabitacionesCliente( this.idHotel)
        Swal.fire({
          icon: 'success',
          title: 'Reservacion hecha Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
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
