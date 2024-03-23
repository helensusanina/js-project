import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserProfilePage from './components/UserProfilePage';
import RegistrationPage from './components/RegistrationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/user/:userId" element={<UserProfilePage />} />
                <Route path="/registration" element={<RegistrationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
