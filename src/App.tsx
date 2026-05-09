import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { HomeScreen } from './pages/HomeScreen';
import { AppProviders } from './providers/AppProviders';
import {UIComponentsPage} from "@/pages/UIComponentsPage.tsx";

const App = () => {
    return (
        <AppProviders>
            <Routes>
                {/* Home page */}
                <Route path="/" element={<HomeScreen />} />
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