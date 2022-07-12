import { Component, OnInit } from '@angular/core';
import { Habitaciones } from 'src/app/models/habitaciones.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HotelService } from 'src/app/services/hotel.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.scss'],
  providers: [UsuarioService, HotelService, HabitacionService]

})
export class HabitacionComponent implements OnInit {

  public habitacionModelGet: Habitaciones;
  public habitacionModelGetAdmin: Habitaciones;
  public habitacionModelPost: Habitaciones;
  public habitacionModelGetId: Habitaciones;
  public token;
  public idHotel;


  constructor(
    public _habitacionService: HabitacionService,
    public _usuarioService: UsuarioService,
    public _hotelService: HotelService,
    public _activatedRoute: ActivatedRoute
  ) {

    this.habitacionModelPost = new Habitaciones('', 0,'', '', 0, false, '', '');
    this.habitacionModelGetId = new Habitaciones('', 0,'', '', 0, false, '','');
    this.token = this._usuarioService.getToken();

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getHabitaciones(dataRuta.get('idHotel'))
      this.idHotel = dataRuta.get('idHotel')
    })
  }

  getHabitaciones(idHotel){
    this._habitacionService.getHabitaciones(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.habitacionModelGet = response.habitaciones;
      },
      error: (error: any)=>{
      }
    })

  }

  postHabitacion(idHotel){
    this._habitacionService.postHabitacion(idHotel,this.habitacionModelPost ,this.token).subscribe({
      next: (response: any) => {
        this.getHabitaciones(idHotel);
        this.habitacionModelPost.numHabitacion= 0;
        this.habitacionModelPost.imgUrlHabitacion = '';
        this.habitacionModelPost.tipoHabitacion= '';
        this.habitacionModelPost.Precio = 0;
        this.habitacionModelPost.disponibilidad= false;
        this.habitacionModelPost.hotel = idHotel;
        this.habitacionModelPost.usuario = '';

        Swal.fire({
          icon: 'success',
          title: 'Habitacion Agregada Correctamente',
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

  putHabitacion(){
    this._habitacionService.updateHabitacion(this.habitacionModelGetId, this.token).subscribe({
      next: (response: any) => {
        this.getHabitaciones(this.idHotel);
        Swal.fire({
          icon: 'success',
          title: 'Hotel Editado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  deleteHabitacion(idHabitacion){
    Swal
      .fire({
        title: "¿Estas Seguro de Eliminar?",
        icon: 'warning',
        iconColor: "#0D6EFD",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        confirmButtonColor: "#0D6EFD",
        cancelButtonText: "Cancelar",
    }).then(resultado => {
      if(resultado.value){
        this._habitacionService.deleteHabitacion(idHabitacion, this.token).subscribe({
          next: (response: any) => {
            this.getHabitaciones(this.idHotel);
            Swal.fire({

              icon: 'success',
              title: 'eliminado exitosamente',
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

}
