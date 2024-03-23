import { Table, Model, Column, HasMany } from "sequelize-typescript";
import database from "../database/database";

@Table({tableName: 'tipo_usuario', timestamps: false})
export class TipoUsuario extends Model {
  @Column({primaryKey: true})
  declare id: number

  @Column
  declare codigo: string
}
database.addModels([TipoUsuario]);