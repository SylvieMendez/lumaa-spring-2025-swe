import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    description?: string;
    isComplete: boolean;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks');
        }
    };

    const createTask = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/tasks',
                { title: newTaskTitle, description: newTaskDescription },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewTaskTitle('');
            setNewTaskDescription('');
            fetchTasks(); // Refresh the task list
        } catch (err) {
            setError('Failed to create task');
        }
    };

    const updateTask = async (id: number, isComplete: boolean) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/tasks/${id}`,
                { isComplete },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTasks(); // Refresh the task list
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const deleteTask = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks(); // Refresh the task list
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h2>Tasks</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input
                    type="text"
                    placeholder="New Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="New Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <button onClick={createTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <input
                            type="checkbox"
                            checked={task.isComplete}
                            onChange={(e) => updateTask(task.id, e.target.checked)}
                        />
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Tasks;