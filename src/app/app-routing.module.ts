import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPadreComponent } from './components/admin-padre/admin-padre.component';
import { ClientePadreComponent } from './components/cliente-padre/cliente-padre.component';
import { GerentePadreComponent } from './components/gerente-padre/gerente-padre.component';
import { HomeGeneralComponent } from './components/home-general/home-general.component';
import { HomeComponent  } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { RegistrarGerenteComponent } from './components/registrar-gerente/registrar-gerente.component';
import { AdminValiGuard } from './guards/admin-vali.guard';
import { ClienteValiGuard } from './guards/cliente-vali.guard';
import { GerenteValiGuard } from './guards/gerente-vali.guard';
import { NadieValiGuard } from './guards/nadie-vali.guard';
import { ListUserComponent } from'./components/list-user/list-user.component'
import { HotelComponent } from './components/hotel/hotel.component'
import { PerfilComponent } from './components/perfil/perfil.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { HotelesSAdminComponent } from './components/hoteles-sadmin/hoteles-sadmin.component';

import { ReservacionesAdminhotelComponent } from './components/reservaciones-adminhotel/reservaciones-adminhotel.component'

import { HotelesUsuarioComponent } from './components/hoteles-usuario/hoteles-usuario.component'
import { DashboardHotelsComponent } from './components/dashboard-hotels/dashboard-hotels.component';
import { HabitacionesClienteComponent } from './components/habitaciones-cliente/habitaciones-cliente.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { HistorialComponent } from './components/historial/historial.component'
import { FacturasComponent } from './components/facturas/facturas.component';
import { VerGastosComponent } from './components/ver-gastos/ver-gastos.component';




const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registrarCliente', component: RegistrarClienteComponent},
  {path: 'registrarGerente', component: RegistrarGerenteComponent},
  {path: 'homeGeneral', component: HomeGeneralComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hoteles', component: HotelesUsuarioComponent },







  { path: 'admin', component: AdminPadreComponent, canActivate: [NadieValiGuard, AdminValiGuard], children: [

    {path: 'listUser', component: ListUserComponent},
    {path: 'dashboardHotels', component: DashboardHotelsComponent},
    {path: 'hotelA/:idUsuario', component: HotelesSAdminComponent},
    {path: 'habitacion/:idHotel', component: HabitacionComponent},
    {path: 'reservaciones/:idHotel', component: ReservacionesAdminhotelComponent },

  ]},

  { path: 'gerente', component: GerentePadreComponent, canActivate: [NadieValiGuard, GerenteValiGuard], children: [

    {path: 'hotel', component: HotelComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'eventos/:idHotel', component: EventosComponent},
    {path: 'reservaciones/:idHotel', component: ReservacionesAdminhotelComponent },
    {path: 'servicio/:idHotel', component: ServiciosComponent},
    {path: 'habitacion/:idHotel', component: HabitacionComponent},
    {path: 'factura/:idHotel', component: FacturasComponent},


  ]},

  { path: 'cliente', component: ClientePadreComponent, canActivate: [NadieValiGuard, ClienteValiGuard], children: [

    {path: 'habitaciones/:idHotel',component: HabitacionesClienteComponent },
    {path: 'homeGeneral', component: HomeGeneralComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'hoteles', component: HotelesUsuarioComponent },
    {path: 'historial', component: HistorialComponent},

    {path: 'reservacion', component: ReservacionComponent },
    {path: 'gastos', component: VerGastosComponent },
    {path: 'eventos/:idHotel', component: EventosComponent},


  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
