import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento.model';
import { UsuarioService } from '../../services/usuario.service';
import { EventosService } from '../../services/eventos.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventosService, UsuarioService]
})
export class EventosComponent implements OnInit {

  public eventoModelGet: Evento;
  public eventoModelPost: Evento;
  public eventoModelGetId: Evento;
  public token;
  public idHotel

  constructor(
    public _eventoService: EventosService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.eventoModelPost = new Evento('','','', '', '', '', '');
    this.eventoModelGetId = new Evento('','','', '', '', '', '');
    this.token = this._usuarioService.getToken()
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getEventos(dataRuta.get('idHotel'))
      this.idHotel = dataRuta.get('idHotel')
    })
  }


  getEventos(idHotel){
    this._eventoService.VerEventos(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.eventoModelGet = response.eventos;
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

  postEventos(idHotel){
    this._eventoService.CrearEvento(this.eventoModelPost, this.token, idHotel).subscribe({
      next: (response: any) => {
        this.getEventos(this.idHotel);

        this.eventoModelPost.Nombre = '';
        this.eventoModelPost.tipoEvento = '';
        this.eventoModelPost.Descripcion = '';

        Swal.fire({
          icon: 'success',
          title: 'Evento Agregado Correctamente',
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

  getEventoId(idEvento){
    this._eventoService.VerEventosId(idEvento, this.token).subscribe({
      next: (response: any) =>{
        this.eventoModelGetId = response.eventos
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

  putEventos(){
    this._eventoService.EditarEvento(this.eventoModelGetId, this.token).subscribe({
      next: (response: any) => {
        this.getEventos(this.idHotel);
        Swal.fire({
          icon: 'success',
          title: 'Evento Editado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (err) =>{
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  deleteEventos(idEvento){
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
        this._eventoService.EliminarEvento(idEvento, this.token).subscribe({
          next: (response: any) => {
            this.getEventos(this.idHotel);
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
