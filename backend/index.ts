import cors from 'cors';
import express from 'express';
import { login, register } from './Controllers/authController';
import { createTask, deleteTask, getTasks, updateTask } from './Controllers/taskController';
import { authenticateToken } from './Middleware/middleware';

const app = express();
const port = 5000;

// Enable CORS for requests from http://localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello from backend');
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