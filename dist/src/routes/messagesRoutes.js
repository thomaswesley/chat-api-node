import express from 'express';
import MessagesController from '../controllers/MessagesController.js';
const router = express.Router();
router.get('/messages', MessagesController.getMessages);
router.post('/messages', MessagesController.postMessage);
export default router;
