import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db';
import { AuthenticatedRequest } from '../types';

export const register = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            [username, hashedPassword]
        );

        // Return the new user's ID
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error('Registration error:', error);

        // Handle duplicate username error
        if ((error as any).code === '23505') { // PostgreSQL error code for unique violation
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        res.status(500).json({ message: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    try {
        // Fetch the user from the database
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        // Check if the user exists and the password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};