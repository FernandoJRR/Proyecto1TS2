import { Router } from "express";
import * as chatController from "../controllers/chat.controller";

const router = Router();

router.get('/chats-usuario/:username',chatController.chatsUsuario);
router.get('/mensajes-chat/:id_chat',chatController.mensajesChat);
router.post('/enviar-mensaje/',chatController.enviarMensaje);
router.patch('/ver-mensaje/:id_mensaje',chatController.verMensaje);
router.post('/crear-chat/',chatController.crearChat);

export default router;