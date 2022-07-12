import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistorialService } from '../../services/historial.service';
import { historial } from 'src/app/models/historial.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  providers: [HistorialService, UsuarioService]
})
export class HistorialComponent implements OnInit {

  public HistorialModelGet: historial;
  public HistroialModelGetId: historial;
  public token;

  constructor(
    public _HistrorialUser: HistorialService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute

  ) {

    this.HistroialModelGetId = new historial ('','','','', '',[ {nombreServicios: '' }])
    this.token = this._usuarioService.getToken()


   }

  ngOnInit(): void {
    this.getHistorial()
  }


  getHistorial(){
    this._HistrorialUser.VerHistorial(this.token).subscribe({
      next:(response: any) =>{
        this.HistorialModelGet = response.mensaje;
      },
      error:(err) =>{
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })

      }

    })

  }


}
