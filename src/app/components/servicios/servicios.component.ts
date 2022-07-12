import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicio } from 'src/app/models/servicio.model';
import Swal from 'sweetalert2';
import { HotelService } from 'src/app/services/hotel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [UsuarioService, ServicioService],
})
export class ServiciosComponent implements OnInit {
  public servicioModelPost: Servicio;
  public servicioModelGet: Servicio;
  public servicioModelGetId: Servicio;
  public token;
  public idHotel;

  constructor(
    public _usuarioService: UsuarioService,
    public _servicioService: ServicioService,
    public _hotelService: HotelService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.servicioModelPost = new Servicio('', '', '', 0, '', '');
    this.servicioModelGetId = new Servicio('', '', '', 0, '', '');
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getServicios(dataRuta.get('idHotel'));
      this.idHotel = dataRuta.get('idHotel');
    });
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

  obtenerServiciosId(idServicio) {
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

  postServicios(idHotel) {
    this._servicioService
      .agregarServicio(idHotel, this.servicioModelPost, this.token)
      .subscribe(
        (response) => {
          this.getServicios(idHotel);
          this.servicioModelPost.servicio = '';
          this.servicioModelPost.descripcion = '';
          this.servicioModelPost.Precio = 0;
          this.servicioModelPost.Usuario = this.token._id;
          this.servicioModelPost.hotel = idHotel;
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
            title: 'Servicio añadido con exito',
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
            icon: 'warning',
            title: error.error.mensaje,
          });
        }
      );
  }
  putServicio() {
    this._servicioService
      .editarServicio(this.servicioModelGetId, this.token)
      .subscribe(
        (response) => {
          this.getServicios(this.idHotel);
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
            title: 'Servicio editado con exito',
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
            icon: 'warning',
            title: error.error.mensaje,
          });
        }
      );
  }
  deleteServicio(idServicio) {
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
        this._servicioService.eliminarServicio(idServicio, this.token).subscribe({
          next: (response: any) => {
            this.getServicios(this.idHotel);
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
