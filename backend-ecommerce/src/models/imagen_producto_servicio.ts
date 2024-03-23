import {
  Table,
  Model,
  Column,
  HasMany,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import database from "../database/database";
import { ProductoServicio } from "./producto_servicio";

@Table({
  tableName: "imagen_producto_servicio",
  timestamps: true,
  createdAt: false,
  updatedAt: "updatedAt",
})
export class ImagenProductoServicio extends Model {
  @ForeignKey(() => ProductoServicio)
  @Column({ primaryKey: true })
  declare id_producto_servicio: number;

  @Column
  declare imagen_base64: string;
}
database.addModels([ImagenProductoServicio]);
