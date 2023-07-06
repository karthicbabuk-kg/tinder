import express from 'express';
import { getMessages, addMessage } from '../controllers/messageController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/messages', authenticateToken, getMessages);
router.post('/message', authenticateToken, addMessage);

export default router;
