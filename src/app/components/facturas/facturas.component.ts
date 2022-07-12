import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/models/factura.model';
import { FacturasService } from 'src/app/services/facturas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss'],
})
export class FacturasComponent implements OnInit {
  public facturasModelPost: Factura;
  public facturasModelGet: Factura;
  public facturasModelGet2: Factura;
  public facturasModelGetId: Factura;
  public token;
  public idHotel;

  constructor(
    public _facturaService: FacturasService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.facturasModelPost = new Factura(
      '',
      '',
      [{ nombreServicios: '', precio: 0 }],
      0,
      0,
      '', ''
    );
    this.facturasModelGetId = new Factura(
      '',
      '',
      [{ nombreServicios: '', precio: 0 }],
      0,
      0,
      '', ''
    );
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getFactura(dataRuta.get('idHotel'));
      this.idHotel = dataRuta.get('idHotel');
    });
  }

  getFactura(idHotel) {
    this._facturaService.verFacturas(this.token, idHotel).subscribe({
      next: (response: any) => {
        this.facturasModelGet = response.VerFacturas;
      },
      error: (error: any) => {},
    });
  }
  getFacturaId(idFactura) {
    this._facturaService.verFacturasId(this.token, idFactura).subscribe({
      next: (response: any) => {
        this.facturasModelGetId = response.VerFacturasID;
      },
      error: (error: any) => {},
    });
  }

  //Confirmar Factura
  generarFactura(idFactu) {
    this._facturaService.crearFactura(this.token, idFactu).subscribe({
      next: (response: any) => {
        this.getFactura(this.idHotel);
        this.facturasModelGet2 = response.mensaje;
        Swal.fire({
          icon: 'success',
          title: 'Confirmación exitosa, ya puede imprimir la factura',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      },
    });
  }

  actualizar(idFactura) {
    this.getFactura(this.idHotel);
  }



}
