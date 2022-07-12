import { Component, OnInit } from '@angular/core';
import {ReservacionesAdminhotelService} from '../../services/reservaciones-adminhotel.service';
import { Reservacion } from '../../models/reservacion.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ServicioService } from '../../services/servicio.service';
import Swal from 'sweetalert2'
import { Servicio } from 'src/app/models/servicio.model';
import { ActivatedRoute } from '@angular/router';
import { Gasto } from 'src/app/models/gastosServicios.model';


@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss'],
  providers: [UsuarioService, HotelService, ReservacionesAdminhotelService, ServicioService]
})
export class ReservacionComponent implements OnInit {

  public reservacionModelGet: Reservacion;
  public servicioModelGet: Servicio;
  public servicioModelGetId: Servicio;
  public servicioModelPost: Servicio;
  public token;

  constructor(
    public _usuarioService: UsuarioService,
    public _reservationService: ReservacionesAdminhotelService,
    public _servicioService: ServicioService,
  ) {
    this.token = this._usuarioService.getToken();
    this.servicioModelPost = new Servicio('', '', '', 0, '', '');
   }

  ngOnInit(): void {
    this.getReservacionUser();
    this.getServicios
  }

  getReservacionUser(){
    this._reservationService.getReservacion(this.token).subscribe({
      next: (response: any) => {
        this.reservacionModelGet = response.mensaje;
      },
      error: (err) => {

      }
    })
  }



  cancelarReservacion(){

    Swal
      .fire({
        title: "Estas seguro de cancelar tu reservación",
        icon: 'warning',
        iconColor: "#0D6EFD",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        confirmButtonColor: "#0D6EFD",
        cancelButtonText: "Cancelar",
    }).then(resultado=>{
      if(resultado.value){
        this._reservationService.cancelarReservacion(this.token).subscribe({
          next: (response: any) => {
            this.getReservacionUser();
            Swal.fire({
              icon: 'success',
              title: 'Reservacion Cancelada, pidele la factura al administrador del hotel',
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
    })

  }

  getServicios(idHotel) {
    this._servicioService.verServicios(idHotel, this.token).subscribe(
      (response) => {
        this.servicioModelGet = response.Servicios;
      },
      (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: error.error.mensaje,
        });
      }
    );

  }


  getServiciosId(idServicio) {
    this._servicioService.getServiciosId(idServicio, this.token).subscribe(
      (response) => {
        this.servicioModelGetId = response.Servicios;

      },
      (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: error.error.mensaje,
        });
      }
    );
  }

  agregarServicioHabitacion() {
    this._servicioService.agregarServicioHabitacion(this.servicioModelPost, this.token).subscribe(

      (response) => {

        this.servicioModelPost.servicio = ''
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Servicio Solicitado',
        });


      },
      (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: error.error.mensaje,
        });
      }
    );

  }
}
