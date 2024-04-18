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

@Table({
  tableName: "categoria",
  timestamps: true,
})
export class Categoria extends Model {
  @Column({primaryKey: true})
  declare id: number;
  
  @Column
  declare nombre: string;
};
database.addModels([Categoria]);
