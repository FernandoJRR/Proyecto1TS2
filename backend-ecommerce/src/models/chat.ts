import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import database from "../database/database";

@Table({ tableName: "chat", timestamps: false })
export class Chat extends Model {
  @Column({ primaryKey: true })
  declare id: number;

  @Column
  declare id_usuario_1: string;

  @Column
  declare id_usuario_2: string;

  @Column
  declare id_producto_servicio: number;

  @Column
  declare fecha_inicio: Date;

  @Column
  declare fecha_finalizacion: Date;
}
database.addModels([Chat]);
