import { Transaccion } from "../models/transaccion";

export async function getTransaccionesUsuario(usuario: string) {
    console.log(usuario)
    const transacciones = await Transaccion.findAll({where: {username_cuenta: usuario}});
    return transacciones;
}