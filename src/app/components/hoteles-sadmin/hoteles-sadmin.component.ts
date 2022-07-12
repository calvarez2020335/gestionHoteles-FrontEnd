import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HotelService } from 'src/app/services/hotel.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ActivatedRoute } from '@angular/router';
import { Habitaciones } from 'src/app/models/habitaciones.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hoteles-sadmin',
  templateUrl: './hoteles-sadmin.component.html',
  styleUrls: ['./hoteles-sadmin.component.scss'],
  providers: [HotelService, UsuarioService, HabitacionService],
})
export class HotelesSAdminComponent implements OnInit {
  public hotelModelGet: Hotel;
  public hotelModelPost: Hotel;
  public hotelModelGetId: Hotel;
  public usuarioModelGet: Usuario;
  public habitacionModelGet: Habitaciones;
  public token;
  public idUsuario;
  public habitacionesDisponibles;

  constructor(
    public _usuarioService: UsuarioService,
    public _hotelService: HotelService,
    public _activatedRoute: ActivatedRoute,
    public _habitacionService: HabitacionService,
  ) {
    this.hotelModelPost = new Hotel('', '', '', '', '', '', 0);
    this.hotelModelGetId = new Hotel('', '', '', '', '', '', 0);
    this.token = _usuarioService.getToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getHoteles(dataRuta.get('idUsuario'));
      this.idUsuario = dataRuta.get('idUsuario');
      this.verGerentes();
    });
  }
  getHoteles(idUsuario) {
    this._hotelService.verHotelesSuperAdmin(this.token, idUsuario).subscribe({
      next: (response: any) => {
        this.hotelModelGet = response.Hoteles;
      },
      error: (error: any) => {},
    });
  }

  postHotel(idUsuario) {
    this._hotelService
      .RegistrarHotel(this.hotelModelPost, this.token)
      .subscribe({
        next: (response: any) => {
          this.getHoteles(idUsuario);
          this.hotelModelPost.Nombre = '';
          this.hotelModelPost.Descripcion = '';
          this.hotelModelPost.Direccion = '';
          this.hotelModelPost.imgUrlHoltel = '';
          this.hotelModelPost.adminHotel = this.idUsuario;
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
            title: 'Hotel añadido al gerente',
          });
        },
        error: (error: any) => {
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
            icon: 'warning',
            title: error.error.mensaje,
          });
        },
      });
  }
  putHotel() {
    this._hotelService.editarHotel(this.hotelModelGetId, this.token).subscribe({
      next: (response: any) => {
        this.getHoteles(this.idUsuario);
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
          title: 'Hotel editado con exito',
        });
      },
      error: (error: any) => {
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
          icon: 'warning',
          title: error.error.mensaje,
        });
      },
    });
  }

  getHotelId(idHotel) {
    this._hotelService.VerHotelId(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.hotelModelGetId = response.Hotel;
      },
      error: (error: any) => {
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
      },
    });
  }
  eliminarHotel(idHotel) {
    Swal.fire({
      title: '¿Estas Seguro de Eliminar?',
      icon: 'warning',
      iconColor: '#0D6EFD',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#0D6EFD',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.value) {
        this._hotelService.deleteHotel(idHotel, this.token).subscribe({
          next: (response: any) => {
            this.getHoteles(this.idUsuario);
            Swal.fire({
              icon: 'success',
              title: 'eliminado exitosamente',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: err.error.mensaje,
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      }
    });
  }
  verGerentes() {
    this._usuarioService.verGerentes(this.token).subscribe({
      next: (response: any) => {
        this.usuarioModelGet = response.adminHoteles;
      },
      error: (error: any) => {
      },
    });
  }

  habitacionesDiponibles(idHotel) {
    this._hotelService.habitacionesDisponibles(idHotel, this.idUsuario).subscribe({
      next: (response: any) => {
        this.habitacionesDisponibles = response.habitacionesDisponibles;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al ver la disponibilidad de habitaciones',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }

  getHabitaciones(idHotel){
    this._habitacionService.getHabitaciones(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.habitacionModelGet = response.habitaciones.length;
      },
      error: (error: any)=>{
      }
    })

  }

}
