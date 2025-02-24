"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authController_1 = require("./Controllers/authController");
const taskController_1 = require("./Controllers/taskController");
const middleware_1 = require("./Middleware/middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({
    origin: true, // Allow requests from any origin during development
    credentials: true, // Important for cookies/auth
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json('Hello from backend');
});
// Your routes
app.post('/auth/register', authController_1.register);
app.post('/auth/login', authController_1.login);
app.get('/tasks', middleware_1.authenticateToken, taskController_1.getTasks);
app.post('/tasks', middleware_1.authenticateToken, taskController_1.createTask);
app.put('/tasks/:id', middleware_1.authenticateToken, taskController_1.updateTask);
app.delete('/tasks/:id', middleware_1.authenticateToken, taskController_1.deleteTask);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
