import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthGate } from '../features/auth/AuthGate';
import { AdminGate } from '../features/profile/AdminGate';
import { ProfileGate } from '../features/profile/ProfileGate';
import { AppLayout } from './layout/AppLayout';
import { AppProviders } from './providers/AppProviders';
import { FeedPage } from '../pages/FeedPage';
import { JournalPage } from '../pages/JournalPage';
import { LoginPage } from '../pages/LoginPage';
import { MapPage } from '../pages/MapPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { SetupProfilePage } from '../pages/SetupProfilePage';
import { SessionsPage } from '../pages/SessionsPage';
import { UiComponentsPage } from '../pages/UiComponentsPage';

const App = () => {
  return (
    <AppProviders>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <AuthGate>
              <ProfileGate>
                <AppLayout />
              </ProfileGate>
            </AuthGate>
          }
        >
          <Route index element={<Navigate to="/journal" replace />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/setup" element={<SetupProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route
            path="dev/ui"
            element={
              <AdminGate>
                <UiComponentsPage />
              </AdminGate>
            }
          />
          <Route path="dev/*" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProviders>
  );
};

export default App;
