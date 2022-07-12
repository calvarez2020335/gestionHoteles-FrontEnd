import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  providers: [HotelService, UsuarioService]
})
export class HotelComponent implements OnInit {

  public hotelModelGet: Hotel;
  public hotelModelPost: Hotel;
  public hotelModelGetId: Hotel;
  public hotelModelGetAdmin: Hotel;
  public token;
  public habitacionesDisponibles;

  constructor(
    public _hotelService: HotelService,
    public _usuarioService: UsuarioService
  ) {
    this.hotelModelPost = new Hotel('', '', '', '', '', '',0);
    this.hotelModelGetId = new Hotel('', '', '', '', '', '',0);
    this.token = this._usuarioService.getToken()

  }

  ngOnInit(): void {
    this.getHotelAdmin();
  }

  getHotelAdmin(){
    this._hotelService.VerHotelesAdmin(this.token).subscribe({
      next:(response: any)=> {
        this.hotelModelGet = response.Hoteles;
      }
    })
  }

  postHotel() {
    this._hotelService.RegistrarHotel(this.hotelModelPost, this.token).subscribe({
      next: (response: any)=>{
        this.getHotelAdmin();
        this.hotelModelPost.Nombre ='';
        this.hotelModelPost.Descripcion = '';
        this.hotelModelPost.Direccion = '';
        this.hotelModelPost.imgUrlHoltel = '';
        this.hotelModelPost.adminHotel = '';
        this.hotelModelPost.VecesSolicitado = 0;

        Swal.fire({
          icon: 'success',
          title: 'Hotel Agregado Correctamente',
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

  getHotelId(idHotel) {
    this._hotelService.VerHotelId(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.hotelModelGetId = response.Hotel;
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

  putHotel() {
    this._hotelService.editarHotel(this.hotelModelGetId, this.token).subscribe({
      next: (response: any)=> {
        this.getHotelAdmin();
        Swal.fire({
          icon: 'success',
          title: 'Hotel Editado Correctamente',
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

  eliminarHotel(idHotel) {
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
      if (resultado.value) {
        this._hotelService.deleteHotel(idHotel, this.token).subscribe({
          next: (response: any)=> {
            this.getHotelAdmin();
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

  habitacionesDiponibles(idHotel){
    this._hotelService.habitacionesDisponibles(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.habitacionesDisponibles = response.habitacionesDisponibles;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al ver la disponibilidad de habitaciones',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}
