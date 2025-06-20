import dotenv from 'dotenv';
dotenv.config();

import Messages from '../models/Messages';
import { Request, Response } from 'express';

class MessagesController { 

  static async getMessages(req: Request, res: Response): Promise<void> {

    console.log('getMessages Pagana');

    res.status(200).json({
      error: false,
      message: 'A busca de mensagens foi realizada com sucesso!',
    }); 
  }

  static async postMessage(req: Request, res: Response): Promise<void> { 
    
    console.log('postMessages Pagana');

    res.status(200).json({
      error: false,
      message: 'A mensagem foi enviada com sucesso!',
    }); 
  }

}

export default MessagesController;
