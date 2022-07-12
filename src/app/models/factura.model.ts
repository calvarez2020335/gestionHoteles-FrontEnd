export class Factura {
  constructor(
    public _id: String,
    public numero: String,
    public servicios: [{
      nombreServicios: String,
      precio: Number,
    }],
    public Subtotal: Number,
    public total: Number,
    public usuario: String,
    public estado: String
  ){}
}
