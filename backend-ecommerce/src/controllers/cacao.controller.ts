import { RequestHandler } from "express";
import * as cacaoService from "../services/cacao.service";

export const comprarCacao: RequestHandler = async (req, res, next) => {
    const input = req.body;
    const username = input.username;
    const cantidad_cacao = input.cantidad;
    const tipo_cambio = await cacaoService.comprarCacao(username, +cantidad_cacao);
    res.status(200).json(tipo_cambio);
}
export const venderCacao: RequestHandler = async (req, res, next) => {
    const input = req.body;
    const username = input.username;
    const cantidad_cacao = input.cantidad;
    const tipo_cambio = await cacaoService.venderCacao(username, +cantidad_cacao);
    res.status(200).json(tipo_cambio);
}