import { Op } from "sequelize";
import { Chat } from "../models/chat";
import { Mensaje } from "../models/mensaje";

export async function chatsUsuario(username: string) {
  const chats = await Chat.findAll({
    where: {
      [Op.or]: [{ id_usuario_1: username }, { id_usuario_2: username }],
    },
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
