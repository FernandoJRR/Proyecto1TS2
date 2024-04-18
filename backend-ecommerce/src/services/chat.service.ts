import { Op, where } from "sequelize";
import { Chat } from "../models/chat";
import { Mensaje } from "../models/mensaje";
import { ProductoServicio } from "../models/producto_servicio";

export async function chatsUsuario(username: string) {
  const chats = await Chat.findAll({
    where: {
      [Op.or]: [{ id_usuario_1: username }, { id_usuario_2: username }],
    },
    include: [
      {
        model: Mensaje,
        order: [["id", "DESC"]],
        limit: 1,
      },
      {
        model: ProductoServicio,
        attributes: ["nombre"],
      },
    ],
  });
  return chats;
}

export async function mensajesChat(id_chat: number) {
  const chats = await Mensaje.findAll({
    where: {
      id_chat: id_chat,
    },
  });
  return chats;
}

export async function enviarMensaje(input: any) {
  console.log(input);
  input.createdAt = new Date();
  input.updatedAt = new Date();
  const mensaje = await Mensaje.create(input);

  return mensaje;
}

export async function verMensaje(id_mensaje: number) {
  const mensaje = await Mensaje.findByPk(id_mensaje);
  if (mensaje == null) {
    throw new Error("No existe el mensaje");
  }
  mensaje.update({
    visto: true,
  });
  //Se marcan como vistos todos los mensajes del chat
  await Mensaje.update(
    { visto: true },
    { where: { id_chat: mensaje.id_chat } }
  );

  return "Mensajes visto exitosamente";
}

export async function crearChat(input: any) {
  input.createdAt = new Date();
  input.updatedAt = new Date();
  console.log('aqui')
  const chat = await Chat.create({
    id_usuario_1: input.id_usuario_1,
    id_usuario_2: input.id_usuario_2,
    id_producto_servicio: input.id_producto_servicio,
    fecha_inicio: input.fecha_inicio,
    fecha_finalizacion: input.fecha_finalizacion,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return chat;
}
