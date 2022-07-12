import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public token;
  user;

  constructor(public userRest: UsuarioService, private _router: Router) {
      this.token = this.userRest.getToken();
    }

  ngOnInit(): void {
    this.user = this.userRest.getIdentidad();
  }


  updateUser(){
    this.userRest.updateUser(this.user._id, this.user, this.token).subscribe({
      next: (response: any) => {
        localStorage.setItem('identidad', JSON.stringify(response.Usuario))
        Swal.fire({
          icon: 'success',
          title: 'usuario Actualizado',
          showConfirmButton: false,
          timer: 1500

        })
      },
      error: (err)=> {
        Swal.fire({
          icon: 'error',
          title: err.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }

      })

  }

  EliminaUsuario(){

    Swal
    .fire({
        title: "¿Estas Seguro De Eliminar Tu Cuenta?",
        icon: 'warning',
        iconColor: "#DF1818" ,
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        confirmButtonColor: "#DF1818",
        cancelButtonText: "Cancelar",
    }).then(resultado => {
      if (resultado.value) {
           // Hicieron click en "Sí"
    this.userRest.EliminaUsuario(this.user._id, this.token).subscribe({
      next: (response: any) => {
        localStorage.removeItem('identidad')
        localStorage.removeItem('token')
        this._router.navigate([''])
        Swal.fire({
          icon: 'success',
          title: 'usuario Eliminado',
          showConfirmButton: false,
          timer: 1500

        })
      },
      error: (err)=> {
        Swal.fire({
          icon: 'error',
          title: err.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  } else {
        // Dijeron que no
  }
  });

  }



}
