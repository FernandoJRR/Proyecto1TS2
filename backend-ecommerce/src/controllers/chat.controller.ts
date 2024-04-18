import { RequestHandler } from "express";
import * as chatService from "../services/chat.service";

export const chatsUsuario: RequestHandler = async (req, res, next) => {
  const usuario = req.params.username;
  const chats = await chatService.chatsUsuario(usuario);
  res.status(200).json(chats);
};

export const mensajesChat: RequestHandler = async (req, res, next) => {
  const id_chat = req.params.id_chat;
  const mensajes = await chatService.mensajesChat(+id_chat);
  res.status(200).json(mensajes);
};

export const enviarMensaje: RequestHandler = async (req, res, next) => {
  const input = req.body;
  const mensajes = await chatService.enviarMensaje(input);
  res.status(200).json(mensajes);
};

export const verMensaje: RequestHandler = async (req, res, next) => {
  const id_mensaje = req.params.id_mensaje;
  const mensajes = await chatService.verMensaje(+id_mensaje);
  res.status(200).json(mensajes);
};

export const crearChat: RequestHandler = async (req, res, next) => {
  const input = req.body;
  const chat = await chatService.crearChat(input);
  res.status(200).json(chat);
};
