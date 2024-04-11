import { Router } from "express";
import * as productoServicioController from "../controllers/producto_servicio.controller";

const router = Router();

router.post('', productoServicioController.postProductoServicio);
router.patch('/editar/:id_producto', productoServicioController.editarPublicacion);
router.post('/reportar/:id_producto_servicio', productoServicioController.reportarPublicacion);
router.get('/reportes', productoServicioController.reportes);
router.get('/buscar/:busqueda', productoServicioController.getBusqueda);
router.patch('/comprar/:id_producto', productoServicioController.comprarProducto);
router.patch('/aprobar/:id_producto', productoServicioController.aprobarProductoServicio);
router.patch('/desaprobar/:id_producto', productoServicioController.desaprobarProductoServicio);
router.get('/imagen/:id_producto', productoServicioController.getImagenProductoServicio);
router.get('/productos-homepage/:usuario_logueado?', productoServicioController.getProductosServiciosHomepage);
router.get('/productos-por-aprobar', productoServicioController.getProductosServiciosPorAprobar);
router.get('/productos-aprobados', productoServicioController.getProductosServiciosAprobados);
router.get('/publicaciones-usuario/:username', productoServicioController.getPublicacionesUsuario);
router.get('/comprado-usuario/:username', productoServicioController.getCompradoUsuario);
router.get('/:id_producto', productoServicioController.getProducto);

export default router;