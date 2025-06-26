
# 🔁 Backend – API Node.js da Charlene (Pagana Pizzaria)

Microsserviço responsável por gerenciar o histórico de mensagens entre os usuários e a IA **Charlene**, atendente virtual da pizzaria Pagana. As mensagens são processadas por um agente de IA (Gemini 1.5) com regras definidas para oferecer um atendimento humanizado, respeitando o cardápio.

---

## 📦 Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express** + **Socket.io**
- **Google Generative AI (Gemini 1.5)**
- **MySQL** com Railway

---

## 🧠 Lógica da IA

A IA responde com base em um `systemPrompt` que simula uma atendente treinada com regras específicas para:

- Vender apenas pizzas, bebidas e sobremesas do cardápio.
- Oferecer bebida se não for pedida.
- Oferecer sobremesa após bebida.
- Usar linguagem simpática e natural.
- Nunca sair do contexto (nada de hambúrguer, promoções ou cupons).

A IA utilizada é o modelo `gemini-1.5-flash`, com `temperature: 0.7`.

---

## 📁 Estrutura de Pastas

```
src/
├── controllers/
│   └── MessagesController.ts  ← lógica principal de atendimento com IA
├── db/
│   └── connectDatabaseMySQL.ts  ← conexão com MySQL
├── models/
│   └── Messages.ts  ← acesso ao banco de dados
├── routes/
│   └── messagesRoutes.ts
├── app.ts
├── server.ts
```

---

## 🔌 WebSocket

O backend emite dois eventos para comunicação em tempo real:

- `message-saved`: resposta ao envio do cliente
- `bot-response`: resposta gerada pela IA

---

## 🌐 API REST

### `POST /messages`

Envia uma nova mensagem e obtém resposta da IA.

**Body esperado:**
```json
{
  "content": "Quero uma pizza Portuguesa",
  "indiceArrayNewMessage": 1
}
```

---

### `GET /messages`

Retorna todas as mensagens salvas no banco, formatadas com horário e remetente.

---

## 🧪 Banco de Dados

Tabela `messages`:

| Campo       | Tipo          | Notas                         |
|-------------|---------------|-------------------------------|
| id          | INT           | PK, AI                        |
| sender      | VARCHAR(100)  | 'user' ou 'bot'               |
| content     | TEXT          | mensagem enviada ou recebida |
| created_at  | TIMESTAMP     | padrão: CURRENT_TIMESTAMP     |

Script SQL:
```sql
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚙️ Como Executar

```bash
# Clonar o repositório
git clone https://github.com/thomaswesley/pagana-api-node
cd pagana-api-node

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar com Nodemon
npm run dev
```

---

## 📄 Variáveis de Ambiente

Exemplo de `.env`:

```env
PORT=3001
GEMINI_API_KEY=sua-chave-do-gemini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_DATABASE=pagana
```

---

## 🔗 Projeto Completo

- Frontend: [https://github.com/thomaswesley/pagana-react](https://github.com/thomaswesley/pagana-react)
- Demo: [https://charlene.ia.thomaswesleysoftware.com.br](https://charlene.ia.thomaswesleysoftware.com.br)

---

Feito com ❤️ por [Thomas Wesley](https://github.com/thomaswesley)
