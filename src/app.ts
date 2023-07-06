import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', messageRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('Server running on PORT ' + PORT));
