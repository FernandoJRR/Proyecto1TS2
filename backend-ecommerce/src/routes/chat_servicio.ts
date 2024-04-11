import { Router } from "express";
import * as chatController from "../controllers/chat.controller";

const router = Router();

router.get('/chats-usuario/:username',chatController.chatsUsuario);
router.get('/mensajes-chat/:id_chat',chatController.mensajesChat);

export default router;