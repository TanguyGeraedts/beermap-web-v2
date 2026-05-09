import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { HomeScreen } from './pages/HomeScreen';
import { AppProviders } from './providers/AppProviders';

const App = () => {
    return (
        <AppProviders>
            <Routes>
                {/* Home page */}
                <Route path="/" element={<HomeScreen />} />

                {/* Login page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AppProviders>
    );
};

export default App;