import { Router } from "express";
import * as tipoCambioController from "../controllers/tipo_cambio.controller";

const router = Router();

router.get('', tipoCambioController.getTipoCambio);
router.post('', tipoCambioController.changeTipoCambio);

export default router;