import dotenv from 'dotenv';
dotenv.config();
class MessagesController {
    static async getMessages(req, res) {
        console.log('getMessages Pagana');
        res.status(200).json({
            error: false,
            message: 'A busca de mensagens foi realizada com sucesso!',
        });
    }
    static async postMessages(req, res) {
        console.log('postMessages Pagana');
        res.status(200).json({
            error: false,
            message: 'A mensagem foi enviada com sucesso!',
        });
    }
}
export default MessagesController;
