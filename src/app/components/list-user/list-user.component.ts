import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [UsuarioService]
})
export class ListUserComponent implements OnInit {
  public usuariosModelGet: Usuario;
  public usuariosModelGetId: Usuario;
  public token;

  constructor(public _usuarioService: UsuarioService) {
    this.token = this._usuarioService.getToken()
    this.usuariosModelGetId = new Usuario('','','','','','');
   }

  ngOnInit(): void {
    this.getUsuarios();
  }


  getUsuarios(){
    this._usuarioService.obtenerUsuario(this.token).subscribe({
      next: (response: any)=>{
        this.usuariosModelGet = response.Empresas;
      },
      error: (err)=>{
      }
    })

  }

  getUsuarioId(idUser){
    this._usuarioService.obtenerUsuarioId(idUser, this.token).subscribe({
      next:(response: any)=>{
        this.usuariosModelGetId = response.usuarioEncontrado;
      },
      error: (err)=>{
      }
    })
  }

  putUsuario(){
    this._usuarioService.editarUsuario(this.usuariosModelGetId, this.token).subscribe({
      next:(response: any)=>{
        this.getUsuarios()
      },
      error: (err)=>{
         Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  deleteUsuario(idUser){
    Swal
    .fire({
        title: "¿Estas Seguro de Eliminar?",
        icon: 'warning',
        iconColor: "#0D6EFD" ,
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        confirmButtonColor: "#0D6EFD",
        cancelButtonText: "Cancelar",
    }).then(resultado => {
      if(resultado.value){
        this._usuarioService.EliminaUsuario(idUser, this.token).subscribe({
          next: (response: any)=>{
            this.getUsuarios();
            Swal.fire({

              icon: 'success',
              title: 'eliminado exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: (err)=>{
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
