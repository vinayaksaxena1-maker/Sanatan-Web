import { LanguageProvider } from './i18n/i18nContext';
import { RouterProvider, AppRoutes } from './routes/AppRoutes';
import { LocationProvider } from './store/locationStore';
import { Layout } from './components/layout/Layout';

export default function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <RouterProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </RouterProvider>
      </LocationProvider>
    </LanguageProvider>
  );
}
