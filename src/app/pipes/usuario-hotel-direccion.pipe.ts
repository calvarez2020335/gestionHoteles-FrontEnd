import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioHotelDireccion'
})
export class UsuarioHotelDireccionPipe implements PipeTransform {

  transform(hotelesUsuarios: any, busqueda:any):any {
    if(busqueda == undefined){
      return hotelesUsuarios;
    }else{
      return hotelesUsuarios.filter(hotelesUsuario=>{
        return hotelesUsuario.Direccion.toLowerCase().includes(busqueda.toLowerCase());
      })
    }

  }

}
