import { RequestHandler } from "express";
import * as categoriaService from "../services/categoria.service";

export const getCategorias: RequestHandler = async (req, res, next) => {
    const categorias = await categoriaService.getCategorias();
    res.status(200).json(categorias);
}