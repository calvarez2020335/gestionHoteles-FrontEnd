export class Habitaciones {
  constructor(
    public _id: String,
    public numHabitacion: Number,
    public imgUrlHabitacion: String,
    public tipoHabitacion: String,
    public Precio: Number,
    public disponibilidad: Boolean,
    public hotel: String,
    public usuario: String
  ){}
}
