import express from 'express';
import {
  getUser,
  addUserMatch,
  getAllUsers,
  getGenderedUsers,
  updateUser,
} from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/user', authenticateToken, getUser);
router.put('/addmatch', authenticateToken, addUserMatch);
router.get('/users', authenticateToken, getAllUsers);
router.get('/gendered-users', authenticateToken, getGenderedUsers);
router.put('/user', authenticateToken, updateUser);

export default router;
