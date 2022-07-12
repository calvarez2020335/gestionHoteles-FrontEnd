import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-gerente',
  templateUrl: './registrar-gerente.component.html',
  styleUrls: ['./registrar-gerente.component.scss'],
  providers: [UsuarioService]
})
export class RegistrarGerenteComponent implements OnInit {
  public usuarioModelPost: Usuario;
  public token;

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

  registrarGerente(){
    this._usuarioService.RegistrarGerente(this.usuarioModelPost, this.token).subscribe(
      (response) => {
        this._router.navigate(['login'])

        this.usuarioModelPost.nombre = '';
        this.usuarioModelPost.email = '';
        this.usuarioModelPost.imgUrl = '';
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
