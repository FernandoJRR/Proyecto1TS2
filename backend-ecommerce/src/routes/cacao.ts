import { Router } from "express";
import * as cacaoController from "../controllers/cacao.controller";

const router = Router();

router.post('/comprar-cacao', cacaoController.comprarCacao);
router.post('/vender-cacao', cacaoController.venderCacao);

export default router;