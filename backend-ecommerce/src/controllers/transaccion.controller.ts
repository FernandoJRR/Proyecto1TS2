import { RequestHandler } from "express";
import * as transaccionService from "../services/transaccion.service ";

export const transacciones: RequestHandler = async (req, res, next) => {
    const usuario = req.params.username;
    const transacciones = await transaccionService.getTransaccionesUsuario(usuario);
    res.status(200).json(transacciones);
}