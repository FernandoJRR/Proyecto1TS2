import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";
// import { responseAPI } from '../handler/responseAPI';
// import { HttpStatus } from '../enums/httpStatus';
// import { Image } from '../models/image';
const readFileAsync = promisify(fs.readFile);

const pathImagenesProductos = path.join(__dirname, "../../public/imagenes_publicaciones");

export const guardarImagen = async (imagen: string, nombre_imagen: string) => {
  const nombreArchivo = `${nombre_imagen}.ib64`;
  const pathArchivo = `${pathImagenesProductos}/${nombreArchivo}`;
  fs.writeFile(pathArchivo, imagen, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
  return nombreArchivo;
};

export const obtenerImagenProductoServicio = async (nombre_imagen:string) => {
    const filePath = `${pathImagenesProductos}/${nombre_imagen}`;
    const filePathDefault = `${pathImagenesProductos}/default.ib64`;
    try {
        const data = await readFileAsync(filePath, 'utf8');
        return data;
    } catch (err:any) {
        const data = await readFileAsync(filePathDefault, 'utf8');
        return data;
    }
}
