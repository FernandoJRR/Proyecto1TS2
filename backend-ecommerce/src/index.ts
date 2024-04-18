import { Express, Request, Response } from "express";
import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./database/database";

import usuarioRoutes from "./routes/usuario";
import tipoCambioRoutes from "./routes/tipo_cambio";
import cacaoRoutes from "./routes/cacao";
import productoServicioRoutes from "./routes/producto_servicio";
import chatsRoutes from "./routes/chat_servicio";
import transaccionesRoutes from "./routes/transacciones";
import categoriaRoutes from "./routes/categorias";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json({limit: '50mb'}));
const corsConfig = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: 'Content-Disposition'
};
app.use(cors(corsConfig));

app.use('/usuario', usuarioRoutes)
app.use('/taza-cambio', tipoCambioRoutes)
app.use('/cacao', cacaoRoutes)
app.use('/producto-servicio', productoServicioRoutes)
app.use('/transacciones', transaccionesRoutes)
app.use('/categorias', categoriaRoutes)
app.use('/chats', chatsRoutes)

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('connection sucsesful')
    } catch (error) {
        
    }
}

main();