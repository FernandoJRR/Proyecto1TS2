import { TipoCambio } from "../models/tipocambio";

export async function getTipoCambio() {
    const tipo_cambio = await TipoCambio.findOne();
    return tipo_cambio;
}

export async function changeTipoCambio(nuevo_tipo_cambio: number) {
    const tipo_cambio = await TipoCambio.findOne();
    if (tipo_cambio == null) {
        throw new Error("No hay ningun tipo de cambio");
        
    }
    tipo_cambio.update({cacao_por_quetzal: nuevo_tipo_cambio});
    return tipo_cambio;
}