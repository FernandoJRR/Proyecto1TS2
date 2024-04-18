import { Router } from "express";
import * as categoriaController from "../controllers/categoria.controller";

const router = Router();

router.get('', categoriaController.getCategorias);

export default router;