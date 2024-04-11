import {
  Table,
  Model,
  Column,
  HasMany,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import database from "../database/database";

@Table({
  tableName: "mensaje",
  timestamps: true,
})
export class Mensaje extends Model {
  @Column({ primaryKey: true })
  declare id: number;

  @Column
  declare id_chat: number;

  @Column
  declare id_usuario_emisor: number;

  @Column
  declare id_usuario_receptor: number;
  
  @Column
  declare contenido: string;

  @Column
  declare fecha_envio: Date;

  @Column
  declare visto: boolean;
}
database.addModels([Mensaje]);
