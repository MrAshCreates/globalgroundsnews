// backend/src/routes/chatRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import {
  getConversations,
  getMessages,
  createConversation,
  sendMessage,
} from '../controllers/chatController';

const router = Router();

router.get('/conversations', authenticateToken, getConversations);
router.get(
  '/conversations/:conversationId/messages',
  authenticateToken,
  getMessages
);
router.post('/conversations', authenticateToken, createConversation);
router.post(
  '/conversations/:conversationId/messages',
  authenticateToken,
  sendMessage
);

export default router;