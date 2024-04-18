import { Cuenta } from "../models/cuenta";
import { TipoCambio } from "../models/tipocambio";
import { Transaccion } from "../models/transaccion";

export async function comprarCacao(username: string, cantidad: number) {
    const cuenta = await Cuenta.findByPk(username);
    if (cuenta == null) {
        throw new Error("La cuenta no existe");
    }
    cuenta.update({balance_cacao: cuenta.balance_cacao + cantidad});
    Transaccion.create({
        username_cuenta: username,
        monto_cacao: cantidad,
        balance_cacao: cuenta.balance_cacao,
        monto_puntos: 0,
        balance_puntos: cuenta.balance_puntos,
        motivo: `Compra de ${cantidad} de Cacao`,
        fecha_transaccion: new Date(),
    });
    return "Cacao comprado existosamente";
}
export async function venderCacao(username: string, cantidad: number) {
    const cuenta = await Cuenta.findByPk(username);
    if (cuenta == null) {
        throw new Error("La cuenta no existe");
    }
    if (cuenta.balance_cacao < cantidad) {
        throw new Error("No cuentas con la cantidad de cacao que quieres vender");
    }
    cuenta.update({balance_cacao: cuenta.balance_cacao - cantidad});
    Transaccion.create({
        username_cuenta: username,
        monto_cacao: -cantidad,
        balance_cacao: cuenta.balance_cacao,
        monto_puntos: 0,
        balance_puntos: cuenta.balance_puntos,
        motivo: `Venta de ${cantidad} de Cacao`,
        fecha_transaccion: new Date(),
    });
    return "Cacao vendido existosamente";
}