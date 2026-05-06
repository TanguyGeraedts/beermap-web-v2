import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminGate } from '@/components/guards/AdminGate';
import { AuthGate } from '@/components/guards/AuthGate';
import { ProfileGate } from '@/components/guards/ProfileGate';
import { AppLayout } from '@/layouts/AppLayout';
import { EditProfilePage } from '@/pages/EditProfilePage';
import { FeedPage } from '@/pages/FeedPage';
import { JournalPage } from '@/pages/JournalPage';
import { LoginPage } from '@/pages/LoginPage';
import { LogBeerPage } from '@/pages/LogBeerPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { SetupProfilePage } from '@/pages/SetupProfilePage';
import { SnapBeerDraftPage } from '@/pages/SnapBeerDraftPage';
import { SessionsPage } from '@/pages/SessionsPage';
import { UiComponentsPage } from '@/pages/UiComponentsPage';
import { AppProviders } from '@/providers/AppProviders';

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
          <Route path="map" element={null} />
          <Route path="beer/log" element={<LogBeerPage />} />
          <Route path="beer/draft" element={<SnapBeerDraftPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
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
