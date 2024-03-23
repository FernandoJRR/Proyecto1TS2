import { Cuenta } from "../models/cuenta";
import { TipoCambio } from "../models/tipocambio";

export async function comprarCacao(username: string, cantidad: number) {
    const cuenta = await Cuenta.findByPk(username);
    if (cuenta == null) {
        throw new Error("La cuenta no existe");
    }
    cuenta.update({balance: cuenta.balance + cantidad});
    return "Cacao comprado existosamente";
}
export async function venderCacao(username: string, cantidad: number) {
    const cuenta = await Cuenta.findByPk(username);
    if (cuenta == null) {
        throw new Error("La cuenta no existe");
    }
    if (cuenta.balance < cantidad) {
        throw new Error("No cuentas con la cantidad de cacao que quieres vender");
    }
    cuenta.update({balance: cuenta.balance - cantidad});
    return "Cacao vendido existosamente";
}