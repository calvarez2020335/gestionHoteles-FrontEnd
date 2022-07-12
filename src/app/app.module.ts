import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { RegistrarGerenteComponent } from './components/registrar-gerente/registrar-gerente.component';
import { HomeGeneralComponent } from './components/home-general/home-general.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from '@rinminase/ng-charts';
import { ClientePadreComponent } from './components/cliente-padre/cliente-padre.component';
import { GerentePadreComponent } from './components/gerente-padre/gerente-padre.component';
import { AdminPadreComponent } from './components/admin-padre/admin-padre.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { HotelesSAdminComponent } from './components/hoteles-sadmin/hoteles-sadmin.component';

import { ReservacionesAdminhotelComponent } from './components/reservaciones-adminhotel/reservaciones-adminhotel.component';
import { UsuarioReservacionPipe } from './pipes/usuario-reservacion.pipe';

import { HotelesUsuarioComponent } from './components/hoteles-usuario/hoteles-usuario.component';

import { DashboardHotelsComponent } from './components/dashboard-hotels/dashboard-hotels.component';

import { HabitacionesClienteComponent } from './components/habitaciones-cliente/habitaciones-cliente.component';
import { UsuarioHotelPipe } from './pipes/usuario-hotel.pipe';
import { UsuarioHotelDireccionPipe } from './pipes/usuario-hotel-direccion.pipe';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { HistorialComponent } from './components/historial/historial.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { VerGastosComponent } from './components/ver-gastos/ver-gastos.component';


@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    NavbarComponent,
    HomeComponent,
    RegistrarClienteComponent,
    RegistrarGerenteComponent,
    HomeGeneralComponent,
    LoginComponent,
    ClientePadreComponent,
    GerentePadreComponent,
    AdminPadreComponent,
    ListUserComponent,
    HotelComponent,
    ServiciosComponent,
    HabitacionComponent,
    EventosComponent,
    HotelesSAdminComponent,
    ReservacionesAdminhotelComponent,
    UsuarioReservacionPipe,
    HotelesUsuarioComponent,
    DashboardHotelsComponent,
    HabitacionesClienteComponent,
    UsuarioHotelPipe,
    UsuarioHotelDireccionPipe,
    ReservacionComponent,
    HistorialComponent,
    FacturasComponent,
    VerGastosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
