import {
  Table,
  Model,
  Column,
  HasMany,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import database from "../database/database";
import { Usuario } from "./usuario";

@Table({
  tableName: "transaccion",
  timestamps: true,
})
export class Transaccion extends Model {
  @Column({primaryKey: true})
  declare id: number;

  @ForeignKey(() => Usuario)
  @Column
  declare username_cuenta: string;

  @Column
  declare monto_cacao: number;

  @Column
  declare balance_cacao: number;

  @Column
  declare monto_puntos: number;

  @Column
  declare balance_puntos: number;

  @Column
  declare motivo: string;

  @Column
  declare fecha_transaccion: Date;
}
database.addModels([Transaccion]);
