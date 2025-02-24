import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { login, register } from './Controllers/authController';
import { createTask, deleteTask, getTasks, updateTask } from './Controllers/taskController';
import { authenticateToken } from './Middleware/middleware';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors({
  origin: true, // Allow requests from any origin during development
  credentials: true, // Important for cookies/auth
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello from backend');
});

// Your routes
app.post('/auth/register', register);
app.post('/auth/login', login);

app.get('/tasks', authenticateToken, getTasks);
app.post('/tasks', authenticateToken, createTask);
app.put('/tasks/:id', authenticateToken, updateTask);
app.delete('/tasks/:id', authenticateToken, deleteTask);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});