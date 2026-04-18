import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { AppProviders } from './providers/AppProviders';
import { HomePage } from '../pages/HomePage';
import { LogPage } from '../pages/LogPage';
import { MapPage } from '../pages/MapPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { UiComponentsPage } from '../pages/UiComponentsPage';

const App = () => {
  return (
    <AppProviders>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="log" element={<LogPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          {import.meta.env.DEV ? (
            <Route path="dev/ui" element={<UiComponentsPage />} />
          ) : (
            <Route path="dev/*" element={<Navigate to="/" replace />} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProviders>
  );
};

export default App;
