import { Express, Request, Response } from "express";
import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.get('/', (req: Request,res: Response) => {
    res.redirect('prueba');
});

app.get('/prueba', (req: Request,res: Response) => {
    res.send('La prueba funciona');
});

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});