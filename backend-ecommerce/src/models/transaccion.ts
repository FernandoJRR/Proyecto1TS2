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
import { Cuenta } from "./cuenta";

@Table({
  tableName: "transaccion",
  timestamps: true,
})
export class Transaccion extends Model {
  @Column({primaryKey: true})
  declare id: number;

  @ForeignKey(() => Cuenta)
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
  
  @BelongsTo(() => Cuenta)
  declare cuenta: Cuenta;
}
database.addModels([Transaccion]);
