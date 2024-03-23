import { RequestHandler } from "express";
import * as tipoCambioService from "../services/tipo_cambio.service";

export const getTipoCambio: RequestHandler = async (req, res, next) => {
    const tipo_cambio = await tipoCambioService.getTipoCambio();
    res.status(200).json(tipo_cambio);
}

export const changeTipoCambio: RequestHandler = async (req, res, next) => {
    const input = req.body;
    const nuevo_tipo_cambio = input.nuevo_tipo_cambio;
    const tipo_cambio = await tipoCambioService.changeTipoCambio(nuevo_tipo_cambio);
    res.status(200).json(tipo_cambio);
}