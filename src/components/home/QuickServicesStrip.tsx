import React from 'react';
import { useRouter } from '../../routes/AppRoutes';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  badgeBg: string;
  badgeBorder: string;
  iconColor: string;
  iconSvg: React.ReactNode;
}

const ROSETTE_PATH =
  'M 42.50 24.00 A 5.2 5.2 0 0 1 40.02 33.25 A 5.2 5.2 0 0 1 33.25 40.02 A 5.2 5.2 0 0 1 24.00 42.50 A 5.2 5.2 0 0 1 14.75 40.02 A 5.2 5.2 0 0 1 7.98 33.25 A 5.2 5.2 0 0 1 5.50 24.00 A 5.2 5.2 0 0 1 7.98 14.75 A 5.2 5.2 0 0 1 14.75 7.98 A 5.2 5.2 0 0 1 24.00 5.50 A 5.2 5.2 0 0 1 33.25 7.98 A 5.2 5.2 0 0 1 40.02 14.75 A 5.2 5.2 0 0 1 42.50 24.00 Z';

const SERVICES: ServiceItem[] = [
  {
    id: 'panchang',
    title: 'आज का पंचांग',
    subtitle: 'तिथि, नक्षत्र, योग, करण',
    route: '/panchang',
    badgeBg: '#EFF6FF',
    badgeBorder: '#BFDBFE',
    iconColor: '#1D4ED8',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M4 20h16M6 20V8M18 20V8M10 20V11M14 20V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 8l9-5 9 5v2H3V8z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'kundli',
    title: 'जन्म कुंडली',
    subtitle: 'अपनी कुंडली बनाएं',
    route: '/kundli',
    badgeBg: '#FEF3C7',
    badgeBorder: '#FDE68A',
    iconColor: '#B45309',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.6" rx="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M3 3l18 18M21 3L3 21" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
        <polygon points="12,3 21,12 12,21 3,12" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'matchmaking',
    title: 'कुंडली मिलान',
    subtitle: 'विवाह मिलान',
    route: '/matchmaking',
    badgeBg: '#FFE4E6',
    badgeBorder: '#FECDD3',
    iconColor: '#E11D48',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path d="M9 10c1 1.5 2 1.5 3 0s2-1.5 3 0" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'muhurat',
    title: 'शुभ मुहूर्त',
    subtitle: 'शुभ कार्यों के लिए',
    route: '/muhurat',
    badgeBg: '#FEF9C3',
    badgeBorder: '#FEF08A',
    iconColor: '#C2410C',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v16M4 12h16M12 4h6M20 12v6M12 20H6M4 12V6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="8" r="1.3" fill="currentColor" />
        <circle cx="16" cy="8" r="1.3" fill="currentColor" />
        <circle cx="8" cy="16" r="1.3" fill="currentColor" />
        <circle cx="16" cy="16" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'choghadiya',
    title: 'चौघड़िया',
    subtitle: 'शुभ समय (दिन-रात)',
    route: '/choghadiya',
    badgeBg: '#FFEDD5',
    badgeBorder: '#FED7AA',
    iconColor: '#EA580C',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 9v4l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 4L4 6.5M17 4l3 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'hora',
    title: 'होरा चक्र',
    subtitle: '२४ होरा का समय',
    route: '/hora',
    badgeBg: '#DCFCE7',
    badgeBorder: '#BBF7D0',
    iconColor: '#16A34A',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'rashifal',
    title: 'राशि-फल',
    subtitle: '१२ राशियों का फल',
    route: '/utilities',
    badgeBg: '#FFE4E6',
    badgeBorder: '#FECDD3',
    iconColor: '#C2410C',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'vrat',
    title: 'व्रत एवं त्योहार',
    subtitle: 'सभी व्रत एवं पर्व',
    route: '/calendar',
    badgeBg: '#FEE2E2',
    badgeBorder: '#FECACA',
    iconColor: '#DC2626',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l4 7h-8l4-7z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 9h12v11H6V9z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 20v-5h4v5" fill="#FFF" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2V1M11 1h2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'calendar',
    title: 'हिंदू कैलेंडर',
    subtitle: 'मास, तिथि, पर्व',
    route: '/calendar',
    badgeBg: '#FFE4E6',
    badgeBorder: '#FECDD3',
    iconColor: '#BE123C',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="13" r="1.2" fill="currentColor" />
        <circle cx="12" cy="13" r="1.2" fill="currentColor" />
        <circle cx="16" cy="13" r="1.2" fill="currentColor" />
        <circle cx="8" cy="17" r="1.2" fill="currentColor" />
        <circle cx="12" cy="17" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'graha',
    title: 'ग्रह स्थिति',
    subtitle: 'वर्तमान गोचर',
    route: '/kundli',
    badgeBg: '#E0F2FE',
    badgeBorder: '#BAE6FD',
    iconColor: '#2563EB',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.9" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(-25 12 12)" fill="none" />
      </svg>
    ),
  },
  {
    id: 'mandir',
    title: 'मंदिर दर्शन',
    subtitle: 'प्रमुख मंदिर',
    route: '/cities',
    badgeBg: '#FEF3C7',
    badgeBorder: '#FDE68A',
    iconColor: '#B45309',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.5 6h-5L12 2z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 9l1.5 4h-3L6 9zM18 9l1.5 4h-3L18 9z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 13h16v8H4v-8z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 21v-4h4v4" fill="#FFF" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'puja',
    title: 'साधना एवं पूजा',
    subtitle: 'विधि और मंत्र',
    route: '/utilities',
    badgeBg: '#FEE2E2',
    badgeBorder: '#FECACA',
    iconColor: '#DC2626',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M5 15h14l-2 6H7l-2-6z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 15h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M12 3c-1 3-3 4-3 6a3 3 0 0 0 6 0c0-2-2-3-3-6z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="10" r="1.2" fill="#FEF08A" />
      </svg>
    ),
  },
  {
    id: 'namkaran',
    title: 'नामकरण',
    subtitle: 'शुभ नाम सुझाव',
    route: '/utilities',
    badgeBg: '#FFEDD5',
    badgeBorder: '#FED7AA',
    iconColor: '#D97706',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <text
          x="12"
          y="18"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fontFamily="serif"
          fill="currentColor"
        >
          ॐ
        </text>
      </svg>
    ),
  },
];

interface QuickServicesStripProps {
  className?: string;
}

export const QuickServicesStrip: React.FC<QuickServicesStripProps> = ({ className = '' }) => {
  const { navigate } = useRouter();

  return (
    <div className={`w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 my-4 sm:my-6 ${className}`}>
      {/* Off-White Luxury Card Surface */}
      <div className="bg-white dark:bg-[#121826] rounded-2xl sm:rounded-[24px] border border-[#EADBCA] dark:border-white/10 shadow-[0_4px_22px_rgba(139,38,18,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Horizontally Scrollable on Mobile/Tablet with Smooth Physics */}
        <div className="flex items-stretch overflow-x-auto no-scrollbar py-2.5 sm:py-3.5 px-1 sm:px-2 divide-x divide-[#F0E6D8] dark:divide-white/5 scroll-smooth">
          {SERVICES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.route)}
              className="group flex-shrink-0 flex flex-col items-center justify-between text-center px-2.5 sm:px-3 py-1.5 min-w-[96px] sm:min-w-[104px] lg:flex-1 cursor-pointer transition-all duration-200 hover:bg-[#FDFBF7] dark:hover:bg-white/[0.03] rounded-xl hover:scale-[1.03]"
              title={`${item.title} — ${item.subtitle}`}
            >
              {/* 1. Scalloped 12-Lobed Floral Rosette Badge */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 48 48">
                  <path
                    d={ROSETTE_PATH}
                    fill={item.badgeBg}
                    stroke={item.badgeBorder}
                    strokeWidth="0.8"
                  />
                </svg>
                {/* Centered Sacred Icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: item.iconColor }}
                >
                  {item.iconSvg}
                </div>
              </div>

              {/* 2. Primary Title */}
              <p className="text-[11.5px] sm:text-[12.5px] font-extrabold text-[#1F2937] dark:text-white font-serif tracking-tight mt-1.5 group-hover:text-[#C45E1A] transition-colors leading-tight truncate max-w-[94px] sm:max-w-[104px]">
                {item.title}
              </p>

              {/* 3. Subtitle Description */}
              <p className="text-[9px] sm:text-[9.5px] text-[#6B7280] dark:text-gray-400 font-sans tracking-tight mt-0.5 truncate max-w-[94px] sm:max-w-[104px]">
                {item.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickServicesStrip;
