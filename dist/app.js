"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const messagesRoutes_1 = __importDefault(require("./src/routes/messagesRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.APP_PAGANA_SOLUCOES_FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express_1.default.static('public'));
app.use('/images', express_1.default.static('images'));
app.use('/', messagesRoutes_1.default);
/*app.use((req, res, next) => {
  //req.io = io;
  next();
});*/
const porta = process.env.PORT || 8081;
server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
