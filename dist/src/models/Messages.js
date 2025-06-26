"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDatabaseMySQL_js_1 = require("../db/connectDatabaseMySQL.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saveMessage = async (message) => {
    const now = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });
    const createdAt = new Date(now);
    try {
        const connection = await (0, connectDatabaseMySQL_js_1.connectDatabaseMySQL)();
        const sql = 'INSERT INTO messages (sender, content, created_at) VALUES (?, ?, ?)';
        const values = [message.sender, message.content, createdAt];
        const [result] = await connection.execute(sql, values);
        return result;
    }
    catch (error) {
        console.error('Erro ao salvar mensagem:', error);
        throw error;
    }
};
const getMessages = async () => {
    try {
        const connection = await (0, connectDatabaseMySQL_js_1.connectDatabaseMySQL)();
        const sql = 'SELECT sender, content, created_at FROM messages ORDER BY created_at ASC';
        const [rows] = await connection.execute(sql);
        return rows;
    }
    catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        throw error;
    }
};
const Messages = {
    saveMessage,
    getMessages,
};
exports.default = Messages;
