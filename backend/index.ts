import express from 'express';
import { login, register } from './authController';
import { authenticateToken } from './middleware';
import { createTask, deleteTask, getTasks, updateTask } from './taskController';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/register', register);
app.post('/auth/login', login);

app.get('/tasks', authenticateToken, getTasks);
app.post('/tasks', authenticateToken, createTask);
app.put('/tasks/:id', authenticateToken, updateTask);
app.delete('/tasks/:id', authenticateToken, deleteTask);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));