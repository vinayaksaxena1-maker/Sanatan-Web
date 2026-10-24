/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Central AppRoutes Router with React.lazy() & Suspense Code-Splitting
 * Zero external router dependency, 100% native browser history & cleanUrls
 */

import React, {
  lazy,
  Suspense,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from 'react';

// 13 Primary Hubs Lazy-Loaded for Code Splitting
const Home = lazy(() => import('../pages/Home'));
const PanchangHub = lazy(() => import('../pages/panchang/PanchangHub'));
const ChoghadiyaHub = lazy(() => import('../pages/choghadiya/ChoghadiyaHub'));
const HoraHub = lazy(() => import('../pages/hora/HoraHub'));
const MuhuratHub = lazy(() => import('../pages/muhurat/MuhuratHub'));
const KundliHub = lazy(() => import('../pages/kundli/KundliHub'));
const CalendarHub = lazy(() => import('../pages/calendar/CalendarHub'));
const UtilitiesHub = lazy(() => import('../pages/utilities/UtilitiesHub'));
const CitiesHub = lazy(() => import('../pages/cities/CitiesHub'));
const SettingsHub = lazy(() => import('../pages/settings/SettingsHub'));
const PrivacyPolicy = lazy(() => import('../pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../pages/legal/TermsOfService'));
const AboutUs = lazy(() => import('../pages/legal/AboutUs'));
const EngineSandbox = lazy(() => import('../pages/sandbox/EngineSandbox'));
const VedicPortalPage = lazy(() => import('../pages/vedic-portal/VedicPortalPage'));

export type HubRoute =
  | '/'
  | '/panchang'
  | '/choghadiya'
  | '/choghadiya-hora'
  | '/hora'
  | '/muhurat'
  | '/kundli'
  | '/calendar'
  | '/utilities'
  | '/matchmaking'
  | '/cities'
  | '/settings'
  | '/privacy-policy'
  | '/terms'
  | '/about-us'
  | '/sandbox'
  | '/engine-sandbox'
  | '/portal'
  | '/vedic-portal';

interface RouterContextValue {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '', ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !props.target &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey
    ) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

/**
 * Production-Grade Shimmer Skeleton Fallback
 * Guarantees zero layout shift (CLS = 0.00) while chunk loads
 */
export const RouteLoadingSkeleton: React.FC = () => (
  <div className="w-full max-w-4xl mx-auto space-y-4 animate-pulse p-4" aria-busy="true" aria-label="Loading page">
    <div className="h-8 bg-amber-200/50 rounded-xl w-1/3"></div>
    <div className="h-4 bg-amber-100/60 rounded-md w-2/3"></div>
    <div className="h-48 bg-white/70 dark:bg-stone-800/70 rounded-2xl border border-amber-200/40 p-6 space-y-4 shadow-xs">
      <div className="h-6 bg-amber-100/70 dark:bg-stone-700 rounded-lg w-1/4"></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="h-16 bg-stone-100/80 dark:bg-stone-700/80 rounded-xl"></div>
        <div className="h-16 bg-stone-100/80 dark:bg-stone-700/80 rounded-xl"></div>
        <div className="h-16 bg-stone-100/80 dark:bg-stone-700/80 rounded-xl"></div>
        <div className="h-16 bg-stone-100/80 dark:bg-stone-700/80 rounded-xl"></div>
      </div>
    </div>
  </div>
);

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '') return '/';
  const cleaned = rawPath.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

export interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = useCallback((to: string) => {
    const normalized = normalizePath(to);
    if (normalized !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const AppRoutes: React.FC = () => {
  const { currentPath } = useRouter();

  // Match active hub component
  const renderRoute = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/panchang':
        return <PanchangHub />;
      case '/choghadiya':
      case '/choghadiya-hora':
        return <ChoghadiyaHub />;
      case '/hora':
        return <HoraHub />;
      case '/muhurat':
        return <MuhuratHub />;
      case '/kundli':
        return <KundliHub />;
      case '/calendar':
        return <CalendarHub />;
      case '/utilities':
      case '/matchmaking':
        return <UtilitiesHub />;
      case '/cities':
        return <CitiesHub />;
      case '/settings':
        return <SettingsHub />;
      case '/privacy-policy':
        return <PrivacyPolicy />;
      case '/terms':
        return <TermsOfService />;
      case '/about-us':
        return <AboutUs />;
      case '/sandbox':
      case '/engine-sandbox':
        return <EngineSandbox />;
      case '/portal':
      case '/vedic-portal':
        return <VedicPortalPage />;
      default:
        return <Home />;
    }
  };

  return (
    <Suspense fallback={<RouteLoadingSkeleton />}>
      {renderRoute()}
    </Suspense>
  );
};

export default AppRoutes;
