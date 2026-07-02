import {Navigate, Route, Routes} from 'react-router-dom';
import {AppProviders} from './providers/AppProviders';
import {AppLayout} from "@/layout/AppLayout.tsx";
import {PlaceholderPage} from "@/pages/PlaceholderPage.tsx";
import {SettingsPage} from "@/pages/settings/SettingsPage.tsx";
import {CreateProfilePage} from "@/pages/profile/CreateProfilePage.tsx";
import {ProfilePage} from "@/pages/profile/ProfilePage.tsx";
import {EditProfilePage} from "@/pages/profile/EditProfilePage.tsx";
import {LoginPage} from "@/pages/auth/LoginPage.tsx";
import {UIComponentsPage} from "@/pages/dev/UIComponentsPage.tsx";
import {StatsPage} from "@/pages/profile/StatsPage.tsx";
import {FriendsPage} from "@/pages/friendship/FriendsPage.tsx";
import {MapPage} from "@/pages/map/MapPage.tsx";
import {FeedPage} from "@/pages/feed/FeedPage.tsx";
import {LogDrinkPage} from "@/pages/log/LogDrinkPage.tsx";
import {SnapPage} from "@/pages/log/SnapPage.tsx";
import {DraftsPage} from "@/pages/log/DraftsPage.tsx";
import {ChangelogPage} from "@/pages/meta/ChangeLogPage.tsx";
import {LegalPage} from "@/pages/meta/LegalPage.tsx";
import {JournalPage} from "@/pages/journal/JournalPage.tsx";
import {JournalDayPage} from "@/pages/journal/JournalDayPage.tsx";
import {useTheme} from "@/hooks/useTheme.ts";
import {DrinkCatalogPage} from "@/pages/dev/DrinkCatalogPage.tsx";
import {AddDrinkCatalogPage} from "@/pages/dev/AddDrinkCatalogPage.tsx";
import {EditDrinkCatalogPage} from "@/pages/dev/EditDrinkCatalogPage.tsx";

const App = () => {
    useTheme();
    return (
        <AppProviders>
            <Routes>
                {/* STANDALONE PAGES */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile/create" element={<CreateProfilePage />} />
                <Route path="/changelog" element={<ChangelogPage />} />
                <Route path="/legal" element={<LegalPage />} />


                {/* LAYOUT WRAPPER:*/}
                <Route element={<AppLayout />}>

                    {/* MAIN PAGES: */}
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/" element={<MapPage/>} />
                    <Route path="/sessions" element={<PlaceholderPage title="Session" />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* SUB PAGES: */}
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/profile/edit" element={<EditProfilePage/>}/>
                    <Route path="/profile/stats" element={<StatsPage/>}/>
                    <Route path="/profile/friends" element={<FriendsPage/>}/>
                    <Route path="/log" element={<LogDrinkPage />} />
                    <Route path="/snap" element={<SnapPage />} />
                    <Route path="/drafts" element={<DraftsPage />} />
                    <Route path="/journal/day/:date" element={<JournalDayPage />} />

                    {/* DEV PAGES: */}
                    <Route path="/admin/ui-components" element={<UIComponentsPage />} />
                    <Route path="/admin/catalog" element={<DrinkCatalogPage />} />
                    <Route path="/admin/catalog/new" element={<AddDrinkCatalogPage />} />
                    <Route path="/admin/catalog/:id/edit" element={<EditDrinkCatalogPage />} />
                </Route>

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AppProviders>
    );
};

export default App;