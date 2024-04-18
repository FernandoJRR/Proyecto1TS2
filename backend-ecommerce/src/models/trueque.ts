import { Table, Model, Column, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import database from "../database/database";
import { ProductoServicio } from "./producto_servicio";

@Table({tableName: 'trueque', timestamps: true})
export class Trueque extends Model {
  @Column({primaryKey: true})
  declare id: number

  @ForeignKey(() => ProductoServicio)
  @Column
  declare id_producto_servicio_requerido: string

  @ForeignKey(() => ProductoServicio)
  @Column
  declare id_producto_servicio_ofrecido: string

  @Column
  declare cacao_ofrecido: string

  @BelongsTo(() => ProductoServicio)
  declare producto_servicio_requerido: ProductoServicio

  @BelongsTo(() => ProductoServicio)
  declare producto_servicio_ofrecido: ProductoServicio
}
database.addModels([Trueque]);