import { connectDatabaseMySQL } from '../db/connectDatabaseMySQL.js';
import dotenv from 'dotenv';
dotenv.config();
const saveMessage = async (message) => {
    try {
        const connection = await connectDatabaseMySQL();
        const sql = 'INSERT INTO messages (sender, content) VALUES (?, ?)';
        const values = [message.sender, message.content];
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
        const connection = await connectDatabaseMySQL();
        const sql = 'SELECT sender, content FROM messages ORDER BY created_at ASC';
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
export default Messages;
