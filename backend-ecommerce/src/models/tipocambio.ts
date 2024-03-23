import { Table, Model, Column, HasMany } from "sequelize-typescript";
import database from "../database/database";

@Table({
  tableName: "tipo_cambio",
  timestamps: true,
  createdAt: false,
  updatedAt: "updatedAt",
})
export class TipoCambio extends Model {
  @Column({ primaryKey: true })
  declare id: number;

  @Column
  declare cacao_por_quetzal: number;
}
database.addModels([TipoCambio])