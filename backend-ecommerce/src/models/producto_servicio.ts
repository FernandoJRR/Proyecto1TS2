import { Table, Model, Column, HasMany, HasOne, BelongsTo } from "sequelize-typescript";
import database from "../database/database";
import { ImagenProductoServicio } from "./imagen_producto_servicio";
import { Reporte } from "./reporte";

@Table({
  tableName: "producto_servicio",
  timestamps: true,
})
export class ProductoServicio extends Model {
  @Column({ 
    allowNull: false, 
    autoIncrement: true, 
    primaryKey: true 
  })
  declare id: number;
  @Column({allowNull: false})
  declare nombre: string;
  @Column({allowNull: false})
  declare descripcion: string
  @Column({allowNull: false})
  declare precio: number
  @Column
  declare usuario_vendedor: number
  @Column
  declare fecha_publicacion: Date
  //@Column
  //declare id_categoria: number
  @Column
  declare usuario_autorizador: number
  @Column
  declare fecha_autorizacion: Date
  @Column
  declare usuario_comprador: number
  @Column
  declare fecha_compra: Date
  @Column
  declare usuario_baja: number
  @Column
  declare fecha_baja: Date
  @Column({allowNull: false})
  declare es_servicio: boolean
  declare disponible_por_trueque: boolean
  
  @HasOne(() => ImagenProductoServicio)
  declare imagenProductoServicio: ImagenProductoServicio;
}
database.addModels([ProductoServicio])