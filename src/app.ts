import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';

import messagesRoutes from './routes/messagesRoutes.js'; 

const app = express();
const server = http.createServer(app);

const porta = process.env.PORT || 8081;
server.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

app.use(express.json());

app.use(cors({
  origin: process.env.APP_TWS_SOFTWARE_FRONTEND,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

/*const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.APP_TWS_SOFTWARE_FRONTEND,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});*/

app.use((req, res, next) => {
  //req.io = io;
  next();
});

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use('/', messagesRoutes);
