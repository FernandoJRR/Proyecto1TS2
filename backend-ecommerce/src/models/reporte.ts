import {
  Table,
  Model,
  Column,
  HasMany,
  HasOne,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import database from "../database/database";
import { Usuario } from "./usuario";
import { ProductoServicio } from "./producto_servicio";

@Table({
  tableName: "reporte",
  timestamps: true,
})
export class Reporte extends Model {
  @ForeignKey(() => Usuario)
  @Column({ primaryKey: true })
  declare username_usuario: string;

  @ForeignKey(() => ProductoServicio)
  @Column({ primaryKey: true })
  declare id_producto_servicio: number;

  @Column
  declare fecha_reporte: Date;
  
  @BelongsTo(() => ProductoServicio)
  declare producto_servicio: ProductoServicio;
}
database.addModels([Reporte]);
