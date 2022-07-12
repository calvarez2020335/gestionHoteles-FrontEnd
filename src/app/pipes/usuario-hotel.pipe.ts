import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioHotel'
})
export class UsuarioHotelPipe implements PipeTransform {

  transform(hotelesUsuarios: any, busqueda:any):any {
    if(busqueda == undefined){
      return hotelesUsuarios;
    }else{
      return hotelesUsuarios.filter(hotelesUsuario=>{
        return hotelesUsuario.Nombre.toLowerCase().includes(busqueda.toLowerCase());
      })
    }

  }

}
