import express from "express";
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
//import messagesRoutes from './src/routes/messagesRoutes.js';
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: process.env.APP_PAGANA_SOLUCOES_FRONTEND,
        methods: ['GET', 'POST'],
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log('Cliente conectado ao websocket:', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente conectado ao websocket:', socket.id);
    });
});
// Exporta o io para uso nos controllers
app.set('io', io);
app.use(express.json());
app.use(cors({
    origin: process.env.APP_PAGANA_SOLUCOES_FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.static('public'));
app.use('/images', express.static('images'));
//app.use('/', messagesRoutes);
/*app.use((req, res, next) => {
  //req.io = io;
  next();
});*/
const porta = process.env.PORT || 8081;
server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
