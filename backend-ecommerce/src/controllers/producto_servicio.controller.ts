import { RequestHandler } from "express";
import * as productoServicioService from "../services/producto_servicio.service";

export const getProducto: RequestHandler = async (req, res, next) => {
  const id_producto = parseInt(req.params.id_producto);
  const productos = await productoServicioService.getProducto(id_producto);
  res.status(200).json(productos);
};

export const getBusqueda: RequestHandler = async (req, res, next) => {
  const busqueda = req.params.busqueda;
  const productos = await productoServicioService.getBusqueda(busqueda);
  res.status(200).json(productos);
};

export const getImagenProductoServicio: RequestHandler = async (req, res, next) => {
  const id_producto = parseInt(req.params.id_producto);
  const imagen = await productoServicioService.getImagenProductoServicio(id_producto);
  res.status(200).json(imagen);
};

export const getProductosServiciosHomepage: RequestHandler = async (
  req,
  res,
  next
) => {
  const usuario_logueado = typeof req.params.usuario_logueado === "undefined" ? null : req.params.usuario_logueado
  console.log(usuario_logueado)
  const productos =
    await productoServicioService.getProductosServiciosHomepage(usuario_logueado);
  res.status(200).json(productos);
};

export const getProductosServiciosPorAprobar: RequestHandler = async (
  req,
  res,
  next
) => {
  const productos =
    await productoServicioService.getProductosServiciosPorAprobar();
  res.status(200).json(productos);
};

export const getProductosServiciosAprobados: RequestHandler = async (
  req,
  res,
  next
) => {
  const productos =
    await productoServicioService.getProductosServiciosAprobadoos();
  res.status(200).json(productos);
};

export const getPublicacionesUsuario: RequestHandler = async (
  req,
  res,
  next
) => {
  const username = req.params.username;
  const productos = await productoServicioService.getPublicacionesUsuario(
    username
  );
  res.status(200).json(productos);
};

export const getCompradoUsuario: RequestHandler = async (req, res, next) => {
  const username = req.params.username;
  const productos = await productoServicioService.getCompradoUsuario(username);
  res.status(200).json(productos);
};

export const postProductoServicio: RequestHandler = async (req, res, next) => {
  const input = req.body;
  const productos = await productoServicioService.createProductoServicio(input);
  res.status(200).json(productos);
};

export const aprobarProductoServicio: RequestHandler = async (req, res, next) => {
  const id_producto = req.params.id_producto;
  const input = req.body;
  const productos = await productoServicioService.aprobarProductoServicio(+id_producto, input);
  res.status(200).json(productos);
};

export const desaprobarProductoServicio: RequestHandler = async (req, res, next) => {
  const id_producto = req.params.id_producto;
  const input = req.body;
  const productos = await productoServicioService.desaprobarProductoServicio(+id_producto, input);
  res.status(200).json(productos);
};

export const comprarProducto: RequestHandler = async (req, res, next) => {
  const id_producto = req.params.id_producto;
  const input = req.body;
  const productos = await productoServicioService.comprarProducto(+id_producto, input);
  res.status(200).json(productos);
};

export const editarPublicacion: RequestHandler = async (req, res, next) => {
  const id_producto = req.params.id_producto;
  const input = req.body;
  const productos = await productoServicioService.editarPublicacion(+id_producto, input);
  res.status(200).json(productos);
};

export const reportarPublicacion: RequestHandler = async (req, res, next) => {
  const id_producto = req.params.id_producto_servicio;
  const input = req.body;
  const productos = await productoServicioService.reportarPublicacion(+id_producto, input);
  res.status(200).json(productos);
};

export const reportes: RequestHandler = async (req, res, next) => {
  const reportes = await productoServicioService.reportes();
  res.status(200).json(reportes);
};