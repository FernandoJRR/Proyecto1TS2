import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { TipoUsuario } from "./tipousuario";
import database from "../database/database";
import { Cuenta } from "./cuenta";

@Table({ tableName: "usuario", timestamps: true })
export class Usuario extends Model<Usuario> {
  @Column({ primaryKey: true })
  declare username: string;
  @Column({
    allowNull: false,
    validate: { notNull: { msg: "El nombre es obligatorio" } },
  })
  declare nombre: string;
  @Column({
    allowNull: false,
    validate: { notNull: { msg: "El password es obligatorio" } },
  })
  declare password: string;
  @ForeignKey(() => TipoUsuario)
  @Column({
    allowNull: false,
    validate: { notNull: { msg: "El id_tipo_usuario es obligatorio" } },
  })
  declare id_tipo_usuario: number;
  @Column({
    allowNull: false,
    validate: { notNull: { msg: "El es_publico es obligatorio" } },
  })
  declare es_publico: boolean;

  @BelongsTo(() => TipoUsuario)
  declare tipoUsuario: TipoUsuario;
  
  @HasOne(() => Cuenta)
  declare cuenta: Cuenta;
}
database.addModels([Usuario]);
