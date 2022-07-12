import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-dashboard-hotels',
  templateUrl: './dashboard-hotels.component.html',
  styleUrls: ['./dashboard-hotels.component.scss'],
  providers: [UsuarioService, HabitacionService],
})
export class DashboardHotelsComponent implements OnInit {
  chartData: any = [];
  chartLabels: any = [];
  chartLegend: any = [];
  chartPlugins: any = [];
  chartColors:any = [
    {
      backgroundColor: []
    }
  ];
  chartType: any = "bar";
  public altosHotelesModelGet: any = [];
  public token;

  constructor(
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute,
    public _hotelService: HotelService
  ) {
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    this.graficasHotel();
  }

  graficasHotel() {
    this._hotelService.hotelSolicitado(this.token).subscribe({
      next: (response: any) => {
        this.altosHotelesModelGet = response.mensaje;
        this.altosHotelesModelGet.forEach(element => {
          this.chartLabels.push(element.Nombre)
          this.chartData.push(element.VecesSolicitado);
          this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
        });
      },
      error: (response: any) => {},
    });
  }
}
