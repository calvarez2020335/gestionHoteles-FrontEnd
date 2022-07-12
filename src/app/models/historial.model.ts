export class historial {
  constructor(
    public _id: String,
    public usuario: String,
    public hotel: String,
    public factura: String,
    public NombreHotel: String,
    public servicios: [{
       nombreServicios: String,
    }],
  ){}
}
