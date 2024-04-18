import { Router } from "express";
import * as transaccionController from "../controllers/transaccion.controller";

const router = Router();

router.get('/:', transaccionController.transacciones);

export default router;