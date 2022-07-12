import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioReservacion'
})
export class UsuarioReservacionPipe implements PipeTransform {

  transform(usuarioReserva:any, busqueda:any):any {
    if(busqueda == undefined){
      return usuarioReserva;
    }else{
      return usuarioReserva.filter(usuarioReserva=>{
        return usuarioReserva.CorreoReservacion.toLowerCase().includes(busqueda.toLowerCase());
      })
    }
  }

}
