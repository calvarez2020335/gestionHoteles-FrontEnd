import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.scss'],
  providers: [UsuarioService]
})
export class RegistrarClienteComponent implements OnInit {

  public usuarioModelPost: Usuario;
  public token;
  images
  constructor(public _usuarioService: UsuarioService, private _router: Router) {
    this.usuarioModelPost = new Usuario(
      "",
      "",
      "",
      "",
      "",
      ""
    );
    this.token = this._usuarioService.getToken();
   }

  ngOnInit(): void {
  }

  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.images = file;
    }
  }

  registrarCliente(){
    const formData = new FormData();
    formData.append('image', this.images)

    this._usuarioService.RegistrarCliente(this.usuarioModelPost, this.token, formData).subscribe(
      (response) => {
        this._router.navigate(['login'])

        this.usuarioModelPost.nombre = '';
        this.usuarioModelPost.email = '';
        this.usuarioModelPost.password = '';
        this.usuarioModelPost.rol = '';
        Swal.fire({
          icon: 'success',
          title: 'Sii! registro completado',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
