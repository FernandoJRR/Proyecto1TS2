import { Op, Sequelize } from "sequelize";
import { ProductoServicio } from "../models/producto_servicio";
import { Reporte } from "../models/reporte";
import sequelize from "../database/database";
import { ImagenProductoServicio } from "../models/imagen_producto_servicio";
import {
  guardarImagen,
  actualizarImagen,
  obtenerImagenProductoServicio,
} from "../handler/image.handler";
import { Usuario } from "../models/usuario";
import { Cuenta } from "../models/cuenta";

const include_formated_dates = [
  [
    sequelize.fn("date_format", sequelize.col("fecha_publicacion"), "%Y-%m-%d"),
    "fecha_publicacion",
  ],
  [
    sequelize.fn(
      "date_format",
      sequelize.col("fecha_autorizacion"),
      "%Y-%m-%d"
    ),
    "fecha_autorizacion",
  ],
  [
    sequelize.fn("date_format", sequelize.col("fecha_compra"), "%Y-%m-%d"),
    "fecha_compra",
  ],
];

export async function getProducto(id_producto: number) {
  const productos = await ProductoServicio.findByPk(id_producto, {
    include: { model: ImagenProductoServicio },
    attributes: {
      include: [
        [
          sequelize.fn(
            "date_format",
            sequelize.col("fecha_publicacion"),
            "%Y-%m-%d"
          ),
          "fecha_publicacion",
        ],
      ],
    },
  });
  return productos;
}

export async function getBusqueda(busqueda: string) {
  const productos = await ProductoServicio.findAll({
    where: {
      nombre: {
        [Op.like]: `%${busqueda}%`,
      },
      fecha_autorizacion: {
        [Op.not]: null,
      },
      fecha_compra: {
        [Op.is]: null,
      },
    },
    include: { model: ImagenProductoServicio },
    attributes: {
      include: [
        [
          sequelize.fn(
            "date_format",
            sequelize.col("fecha_publicacion"),
            "%Y-%m-%d"
          ),
          "fecha_publicacion",
        ],
      ],
    },
  });
  return productos;
}

export async function getImagenProductoServicio(id_producto: number) {
  const imagen = ImagenProductoServicio.findByPk(id_producto).then((modelo) => {
    return obtenerImagenProductoServicio(modelo!.imagen_base64);
  });
  return imagen;
}

export async function getProductosServiciosHomepage(
  usuario_logueado: string | null
) {
  const productos = await ProductoServicio.findAll({
    include: { model: ImagenProductoServicio },
    attributes: [
      "id",
      "nombre",
      "descripcion",
      "precio",
      "usuario_vendedor",
      "es_servicio",
      [
        sequelize.fn(
          "date_format",
          sequelize.col("fecha_publicacion"),
          "%Y-%m-%d"
        ),
        "fecha_publicacion",
      ],
    ],
    where: {
      usuario_vendedor: {
        [Op.not]: usuario_logueado,
      },
      fecha_autorizacion: {
        [Op.not]: null,
      },
      fecha_compra: {
        [Op.is]: null,
      },
    },
  });
  return productos;
}

export async function getProductosServiciosPorAprobar() {
  const productos = await ProductoServicio.findAll({
    include: { model: ImagenProductoServicio },
    attributes: {
      include: include_formated_dates as any,
    },
    where: {
      fecha_autorizacion: {
        [Op.is]: null,
      },
    },
  });
  return productos;
}

export async function getProductosServiciosAprobadoos() {
  const productos = await ProductoServicio.findAll({
    include: { model: ImagenProductoServicio },
    attributes: {
      include: include_formated_dates as any,
    },
    where: {
      fecha_autorizacion: {
        [Op.not]: null,
      },
    },
  });
  return productos;
}

export async function getPublicacionesUsuario(username: string) {
  const productos = await ProductoServicio.findAll({
    include: { model: ImagenProductoServicio },
    attributes: {
      include: include_formated_dates as any,
    },
    where: {
      usuario_vendedor: username,
    },
  });
  return productos;
}

export async function getCompradoUsuario(username: string) {
  const productos = await ProductoServicio.findAll({
    include: { model: ImagenProductoServicio },
    attributes: {
      include: include_formated_dates as any,
    },
    where: {
      usuario_comprador: username,
    },
  });
  return productos;
}

export async function createProductoServicio(input: any) {
  const imagen_producto_servicio = input.imagen;
  delete input.imagen;

  const autorizados_vendidos = await ProductoServicio.count({
    where: {
      usuario_vendedor: input.usuario_vendedor,
      usuario_comprador: {
        [Op.not]: null,
      },
    },
  });

  input.fecha_publicacion = new Date();
  input.usuario_autorizador = autorizados_vendidos >= 3 ? "admin1" : null;
  input.fecha_autorizacion = autorizados_vendidos >= 3 ? new Date() : null;
  input.usuario_comprador = null;
  input.fecha_compra = null;
  input.usuario_baja = null;
  input.fecha_baja = null;

  const productoCreado = ProductoServicio.create(input).then((producto) => {
    guardarImagen(
      imagen_producto_servicio,
      (producto.id as number).toString()
    ).then((pathImagen: any) => {
      return ImagenProductoServicio.create({
        id_producto_servicio: producto.id,
        imagen_base64: pathImagen,
      });
    });
    return producto;
  });
  return productoCreado;
}

export async function aprobarProductoServicio(id_producto: number, input: any) {
  const producto = await ProductoServicio.findByPk(id_producto);
  if (producto == null) {
    throw new Error("No existe el producto");
  }
  const usuario_autorizador = input.usuario_autorizador;
  producto.update({
    usuario_autorizador: usuario_autorizador,
    fecha_autorizacion: new Date(),
    usuario_baja: null,
    fecha_baja: null,
  });
  return producto;
}

export async function desaprobarProductoServicio(
  id_producto: number,
  input: any
) {
  const producto = await ProductoServicio.findByPk(id_producto);
  if (producto == null) {
    throw new Error("No existe el producto");
  }
  const usuario_baja = input.usuario_baja;
  producto.update({
    usuario_autorizador: null,
    fecha_autorizacion: null,
    usuario_baja: usuario_baja,
    fecha_baja: new Date(),
  });
  return producto;
}

export async function comprarProducto(id_producto: number, input: any) {
  const producto = await ProductoServicio.findByPk(id_producto);
  if (producto == null) {
    throw new Error("No existe el producto");
  }

  producto.update({
    usuario_comprador: input.usuario_comprador,
    fecha_compra: new Date(),
  });

  const cuenta_vendedor = await Cuenta.findByPk(producto.usuario_vendedor);
  if (cuenta_vendedor == null) {
    throw new Error(`No existe la cuenta de ${producto.usuario_vendedor}`);
  }
  const cuenta_comprador = await Cuenta.findByPk(input.usuario_comprador);
  if (cuenta_comprador == null) {
    throw new Error(`No existe la cuenta de ${input.usuario_comprador}`);
  }

  cuenta_vendedor.update({
    balance: cuenta_vendedor.balance + producto.precio,
  });

  cuenta_comprador.update({
    balance: cuenta_comprador.balance - producto.precio,
  });

  return producto;
}

export async function editarPublicacion(id_producto: number, input: any) {
  const imagen_producto_servicio = input.imagen;
  delete input.imagen;

  const producto = await ProductoServicio.findByPk(id_producto);
  if (producto == null) {
    throw new Error("No existe el producto");
  }
  const productoActualizado = producto.update(input).then((producto) => {
    if (imagen_producto_servicio != "") {
      actualizarImagen(
        imagen_producto_servicio,
        (producto.id as number).toString()
      ).then(() => {
        return ImagenProductoServicio.findByPk(producto.id);
      });
    }
    return producto;
  });
  return productoActualizado;
}

export async function reportarPublicacion(id_producto: number, input: any) {
  const producto = await ProductoServicio.findByPk(id_producto);
  if (producto == null) {
    throw new Error("No existe el producto");
  }
  const reporteCreado = await Reporte.create({
    username_usuario: input.username,
    id_producto_servicio: id_producto,
    fecha_reporte: new Date(),
  });
  return reporteCreado;
}

export async function reportes() {
  const reportes = await Reporte.count({
    attributes: ["producto_servicio.*"],
    group: ["id_producto_servicio"],
    include: [ProductoServicio],
  });
  return reportes;
}
