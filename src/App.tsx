import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { AppProviders } from './providers/AppProviders';
import { UIComponentsPage } from "@/pages/UIComponentsPage.tsx";
import { AppLayout } from "@/layout/AppLayout.tsx";
import { PlaceholderPage } from "@/pages/PlaceholderPage.tsx";
import {SettingsPage} from "@/pages/SettingsPage.tsx";

const App = () => {
    return (
        <AppProviders>
            <Routes>
                {/* LAYOUT WRAPPER:*/}
                <Route element={<AppLayout />}>
                    {/* MAIN PAGES: */}
                    <Route path="/journal" element={<PlaceholderPage title="Journal" />} />
                    <Route path="/feed" element={<PlaceholderPage title="Feed" />} />
                    <Route path="/" element={<PlaceholderPage title="Map" />} />
                    <Route path="/sessions" element={<PlaceholderPage title="Session" />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* SUB PAGES: */}
                    <Route path="/settings" element={<SettingsPage />} />

                    {/* DEV PAGES: */}
                    <Route path="/ui-components" element={<UIComponentsPage />} />
                </Route>

                {/* STANDALONE PAGES: No Navbar here */}
                <Route path="/login" element={<LoginPage />} />

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AppProviders>
    );
};

export default App;