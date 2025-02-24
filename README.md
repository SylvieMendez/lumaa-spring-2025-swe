# Task Management Application

This is a full-stack task management application built with React (frontend), Node.js (backend), and PostgreSQL (database). It allows users to register, log in, and manage tasks.

---

## Table of Contents
1. [Setup](#setup)
   - [Database Setup](#database-setup)
   - [Environment Variables](#environment-variables)
2. [Running the Backend](#running-the-backend)
3. [Running the Frontend](#running-the-frontend)
4. [Testing](#testing)
5. [Notes](#notes)

---

## Setup

### Database Setup
1. **Install PostgreSQL**:
   - Install PostgreSQL on your system if you haven't already. You can download it from [here](https://www.postgresql.org/download/).

2. **Create the Database**:
   - Open your PostgreSQL terminal or GUI tool (e.g., pgAdmin).
   - Run the following SQL commands to create the `taskmanager` database and tables:
     ```sql
     CREATE DATABASE taskmanager;

     \c taskmanager;

     CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
     );

     CREATE TABLE tasks (
         id SERIAL PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         description TEXT,
         isComplete BOOLEAN DEFAULT false,
         userId INTEGER REFERENCES users(id)
     );
     ```

---

### Environment Variables
1. Create a `.env` file in the `backend` folder with the following variables:
   DATABASE_URL=postgres://postgres:postgres @localhost:5432/database
  JWT_SECRET=supersecretkey123!@#
  JWT_EXPIRES_IN=1h
  SALT_ROUNDS=10
  PORT=5000

## Running the Backend
1. Navigate to the `backend` folder:
```bash
cd backend
2. Install dependencies, compile typscript to javascript, then Run.
The backend will run on http://localhost:5000

### Running the Frontend
1. Navigate to frontend folder
2. Install dependencies then start.
The backend will run on http://localhost:3000

## Testing
1. Backend
  1. Use curl or Postman to test the backend endpoints:
  Register user: curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d '{"username": "test", "password": "test"}'
  Login: curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"username": "test", "password": "test"}'

2. Frontend
  1. Open the application in your browser (http://localhost:3000).
  2. Register a new user, log in, and test the task management features.

## Notes
CORS: The backend is configured to allow requests from http://localhost:3000. If you change the frontend URL, update the origin in the cors configuration in backend/src/index.ts.

Database Migrations: For simplicity, this project does not include a migration tool. You can manually run the SQL commands provided in the Database Setup section.

Testing: For automated testing, consider adding unit tests for the backend and frontend.
