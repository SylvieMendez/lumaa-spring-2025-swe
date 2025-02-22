import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
}

export default App;