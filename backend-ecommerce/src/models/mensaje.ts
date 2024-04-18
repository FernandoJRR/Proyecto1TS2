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
import { Chat } from "./chat";

@Table({
  tableName: "mensaje",
  timestamps: true,
})
export class Mensaje extends Model {
  @Column({primaryKey: true})
  declare id: number;

  @Column
  declare id_usuario_emisor: string;

  @Column
  declare id_usuario_receptor: string;

  @Column
  declare contenido: string;

  @Column
  declare fecha_envio: Date;
  
  @Column
  declare visto: boolean;
  
  @ForeignKey(() => Chat)
  @Column
  declare id_chat: number;
};
database.addModels([Mensaje]);
