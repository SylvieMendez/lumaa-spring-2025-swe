import { Request, Response } from 'express';
import pool from '../db';

export const getTasks = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const result = await pool.query('SELECT * FROM tasks WHERE userId = $1', [userId]);
    res.json(result.rows);
};

export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user?.userId;
    const result = await pool.query(
        'INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *',
        [title, description, userId]
    );
    res.status(201).json(result.rows[0]);
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 RETURNING *',
        [title, description, isComplete, id]
    );
    res.json(result.rows[0]);
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).send();
};