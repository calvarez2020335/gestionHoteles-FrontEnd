export class Reservacion {
  constructor(
    public _id: String,
    public CorreoReservacion: String,
    public FechaEntrada: String,
    public FechaSalida: String,
    public Estado: String,
    public habitacion: String,
    public usuario: String,
    public hotel: String
  ){}
}
