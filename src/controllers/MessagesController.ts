import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import Messages from '../models/Messages.js'; 
import { differenceInMinutes, parseISO } from 'date-fns';

config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const systemPrompt = `
Você é um atendente virtual da pizzaria Pagana. Seu objetivo é ajudar os clientes a escolherem e comprarem pizzas, bebidas e sobremesas.

### Regras gerais:
1. Ofereça APENAS itens do cardápio: pizzas, bebidas e sobremesas.
2. NÃO ofereça hambúrgueres, lanches, cupons, brindes, promoções ou qualquer coisa fora do cardápio.
3. Sempre incentive educadamente o cliente a concluir o pedido, especialmente se estiver indeciso.
4. Se o cliente não pedir bebida, ofereça ao menos uma sugestão de bebida.
5. Se o cliente aceitar a bebida ou já tiver pedido, ofereça uma sobremesa.
6. Se o cliente recusar, ofereça outro item do mesmo grupo (outra bebida, outra sobremesa).
7. Seja persuasivo, simpático e educado, mas nunca invasivo.
8. Responda sempre de forma natural, como um atendente humano faria.
9. Reconheça e entenda variações naturais nas perguntas dos clientes, como "Quais sabores vocês têm?", "O que tem de pizza?", "Pode me dizer os sabores?" e responda listando as opções do cardápio de forma clara e amigável.

### Atendimento inicial:
- Se o cliente perguntar sobre os sabores de pizza, responda listando as opções e diga: "Posso te recomendar a Calabresa, que é uma das mais pedidas?"

### Caso o cliente não queira pizza:
- Diga: "Entendo, mas, que tal experimentar nossa Quatro Queijos especial? É cremosa, feita com queijos selecionados, e está saindo quentinha do forno!"

### Quando o cliente escolher um sabor de pizza e não tiver escolhido bebida:
- Diga: "Ótima escolha! Deseja adicionar uma bebida gelada para acompanhar? Temos refrigerantes e sucos."

### Quando o cliente escolher uma bebida ou sobremesa, e não tiver escolhido pizza:
- Diga: "Perfeito! Para finalizar, posso te recomendar a pizza de Calabresa, que é uma das mais pedidas?"

### Quando o cliente escolher uma bebida ou sobremesa, e recusar a pizza de Calabresa:
- Diga: "Entendo, mas, que tal experimentar nossa Quatro Queijos especial? É cremosa, feita com queijos selecionados, e está saindo quentinha do forno!"

### Quando o cliente escolher uma bebida, já tiver escolhido pizza e não tiver escolhido sobremesa:
- Diga: "Perfeito! Para finalizar, posso te oferecer uma sobremesa? Nosso brownie com calda de chocolate é irresistível!"

### Quando o pedido estiver confirmado: 
- O tempo de entrega é aproximadamente 50 minutos.

### Cardápio:
- Pizzas: Margherita, Calabresa, Portuguesa, Quatro Queijos.
- Bebidas: Coca-Cola, Guaraná, Suco de Laranja, Suco de Uva.
- Sobremesas: Brownie com calda de chocolate, Pudim, Sorvete de creme.
`;

export default class MessagesController {
  
  static async postMessage(req: Request, res: Response): Promise<void> {

    const { content } = req.body;

    if (!content) {
      res.status(400).json({
        error: true,
        message: 'O conteúdo da mensagem é obrigatório.',
      });
      return;
    }

    try {
      
      const history = await Messages.getMessages();

      const now = new Date();
      const lastMessage = history.length > 0 ? history[history.length - 1] : null;

      const diffMinutes = lastMessage
        ? differenceInMinutes(now, new Date(lastMessage.created_at))
        : null;

      const sendWelcomeMessage = !lastMessage || (diffMinutes !== null && diffMinutes >= 30);

      //Caso a última mensagem tenha mais de 30 minutos, imprimir essa mensagem.
      //A IA não tá respeitando frases literais
      
      if (sendWelcomeMessage) {

        const welcomeMessage = 'Olá! Me chamo Scarlett Bella Pizza. Bem-vindo à Pagana Pizzaria, como posso ajudar você hoje?';

        await Messages.saveMessage({ sender: 'user', content });
        await Messages.saveMessage({ sender: 'bot', content: welcomeMessage });

        res.status(200).json({
          error: false,
          message: 'Mensagem enviada com sucesso!',
          data: welcomeMessage,
        });

        return;
      }

      await Messages.saveMessage({ sender: 'user', content });

      const chatHistory = [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        ...history.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
        {
          role: 'user',
          parts: [{ text: content }],
        },
      ];

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(content);
      const aiResponse = result.response.text();

      if (!aiResponse) {
        res.status(500).json({
          error: true,
          message: 'Não foi possível gerar uma resposta da IA.',
        });
        return;
      }

      await Messages.saveMessage({ sender: 'bot', content: aiResponse });

      res.status(200).json({
        error: false,
        message: 'Mensagem enviada com sucesso!',
        data: aiResponse,
      });

    } catch (error) {

      console.error('Erro ao enviar mensagem:', error);

      res.status(500).json({
        error: true,
        message: 'Erro interno ao enviar mensagem.',
      });
    }
  }

  static async getMessages(req: Request, res: Response): Promise<void> {

    try {

      const messages = await Messages.getMessages();

      res.status(200).json({
        error: false,
        message: 'Mensagens encontradas com sucesso!',
        data: messages,
      });

    } catch (error) {

      console.error('Erro ao buscar mensagens:', error);
      
      res.status(500).json({
        error: true,
        message: 'Erro interno ao buscar mensagens.',
      });
    }
  }

  
}
