import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import database from "../database/database";
import { Usuario } from "./usuario";

@Table({ tableName: "cuenta", timestamps: false })
export class Cuenta extends Model<Cuenta> {
  @ForeignKey(() => Usuario)
  @Column({ primaryKey: true })
  declare username: string;

  @Column({ allowNull: false })
  declare balance: number;
}
database.addModels([Cuenta]);
