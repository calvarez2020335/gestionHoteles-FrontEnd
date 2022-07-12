export class Evento {
  constructor(
    public _id: String,
    public Nombre: String,
    public tipoEvento: String,
    public Descripcion: String,
    public imgUrlEvento: String,
    public hotel: String,
    public adminHotel: String
  ){}
}
