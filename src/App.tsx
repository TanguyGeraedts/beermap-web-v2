import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppLayout } from "@/layout/AppLayout.tsx";
import { PlaceholderPage } from "@/pages/PlaceholderPage.tsx";
import {SettingsPage} from "@/pages/settings/SettingsPage.tsx";
import {CreateProfilePage} from "@/pages/profile/CreateProfilePage.tsx";
import {ProfilePage} from "@/pages/profile/ProfilePage.tsx";
import {EditProfilePage} from "@/pages/profile/EditProfilePage.tsx";
import {LoginPage} from "@/pages/auth/LoginPage.tsx";
import {UIComponentsPage} from "@/pages/dev/UIComponentsPage.tsx";

const App = () => {
    return (
        <AppProviders>
            <Routes>
                {/* STANDALONE PAGES */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile/create" element={<CreateProfilePage />} />

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
                    <Route path="/profile/edit" element={<EditProfilePage/>}/>

                    {/* DEV PAGES: */}
                    <Route path="/ui-components" element={<UIComponentsPage />} />
                </Route>

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AppProviders>
    );
};

export default App;