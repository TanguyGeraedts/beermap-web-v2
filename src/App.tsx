import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { AppProviders } from './providers/AppProviders';
import {UIComponentsPage} from "@/pages/UIComponentsPage.tsx";

const App = () => {
    return (
        <AppProviders>
            <Routes>
                {/* Main pages */}
                <Route path="/" element={<ProfilePage />} />

                {/* Dev page */}
                <Route path="/ui-components" element={<UIComponentsPage />} />

                {/* Login page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AppProviders>
    );
};

export default App;