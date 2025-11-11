import express from 'express';
import { getConversations, getConversation, createConversation, sendMessage, markAsRead } from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getConversations);
router.get('/:id', getConversation);
router.post('/', createConversation);
router.post('/:id/messages', sendMessage);
router.patch('/messages/:messageId/read', markAsRead);

export default router;
