import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="/user/:userId" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
                <Route path="/registration" element={<RegistrationPage />} />
            </Routes>
        </Router >
    );
}
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('my_profile_data');
    return isAuthenticated ? children : <Navigate to="/registration" />;
};

export default App;
