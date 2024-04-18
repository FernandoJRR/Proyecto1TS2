import { Categoria } from "../models/categoria";

export async function getCategorias() {
    const categorias = await Categoria.findAll({attributes: ['id', 'nombre']});
    return categorias;
}