import { LanguageProvider } from './i18n/i18nContext';
import { RouterProvider, AppRoutes } from './routes/AppRoutes';
import { LocationProvider } from './store/locationStore';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <LocationProvider>
          <RouterProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </RouterProvider>
        </LocationProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
