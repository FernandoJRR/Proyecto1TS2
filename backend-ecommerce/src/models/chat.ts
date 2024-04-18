import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import database from "../database/database";
import { Mensaje } from "./mensaje";
import { ProductoServicio } from "./producto_servicio";

@Table({ tableName: "chat", timestamps: true })
export class Chat extends Model {
  @Column({ primaryKey: true })
  declare id: number;

  @Column
  declare id_usuario_1: string;

  @Column
  declare id_usuario_2: string;

  @ForeignKey(() => ProductoServicio)
  @Column
  declare id_producto_servicio: number;

  @Column
  declare fecha_inicio: Date;

  @Column
  declare fecha_finalizacion: Date;

  @BelongsTo(() => ProductoServicio)
  declare producto_servicio: ProductoServicio;
  
  @HasMany(() => Mensaje)
  declare mensaje: Mensaje[];
}
database.addModels([Chat]);
