
# 🔁 Back-end – API Node.js da Charlene (Gordice Pizzaria)

Microsserviço responsável por gerenciar o histórico de mensagens entre os usuários e a IA **Charlene**, atendente virtual da Gordice Pizzaria. As mensagens são processadas por um agente de IA (Gemini 1.5) com regras definidas para oferecer um atendimento humanizado, respeitando o cardápio.

---

## 📦 Tecnologias Utilizadas

### 🔁 Back-end

- **Node.js** + **TypeScript**
- **Express** + **WebSocket**
- **Google Generative AI (Gemini 1.5)**
- **MySQL**
- **Outros**: Socket.io

### 💻 Front-end

- React JS
- WebSocket
- Interface de chat simples e funcional.
- Mensagens do cliente e resposta da IA em tempo real.

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

O back-end emite dois eventos para comunicação em tempo real:

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

## ⚙️ Como Executar Localmente

### 1. Clone os repositórios:

```bash
# Backend
git clone https://github.com/thomaswesley/chat-api-node
cd chat-api-node

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar com Nodemon
npm run dev
```

```bash
# Front-end
git clone https://github.com/thomaswesley/chat-react
cd chat-react

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar
npm run dev
```

---

## 📄 Variáveis de Ambiente

### 1. Back-end:

Exemplo de `.env`:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_DATABASE=pizzaria

APP_CHAT_BACKEND=http://localhost:8081
APP_CHAT_FRONTEND=http://localhost:3000

GEMINI_API_KEY=sua-chave-do-gemini
```

### 2. Front-end:

Exemplo de `.env`:

```env
NEXT_PUBLIC_APP_CHAT_NODE=http://localhost:8081
```

---

## 🔗 Projeto Completo

- Front-end: [https://github.com/thomaswesley/chat-react](https://github.com/thomaswesley/chat-react)
- Demo: [https://charlene.ia.thomaswesleysoftware.com.br/en/apps/chat](https://charlene.ia.thomaswesleysoftware.com.br/en/apps/chat)

---

Feito com ❤️ por [Thomas Wesley](https://github.com/thomaswesley)
