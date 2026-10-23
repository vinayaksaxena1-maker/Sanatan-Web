import React, { useState } from 'react';
import { ArrowUp, CheckCircle } from 'lucide-react';
import { useRouter } from '../../routes/AppRoutes';

interface SanatanFooterProps {
  backgroundImageUrl?: string;
  className?: string;
}

export const SanatanFooter: React.FC<SanatanFooterProps> = ({
  backgroundImageUrl = '/images/sanatan_footer_bg.jpg',
  className = '',
}) => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative w-full text-white overflow-hidden border-t border-[#D4AF37]/35 ${className}`}
      style={{
        backgroundColor: '#051815',
        backgroundImage: `linear-gradient(to right, rgba(3, 14, 12, 0.45) 0%, rgba(4, 20, 18, 0.76) 12%, rgba(5, 24, 21, 0.88) 28%, rgba(5, 24, 21, 0.88) 72%, rgba(4, 20, 18, 0.76) 88%, rgba(3, 14, 12, 0.40) 100%), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      {/* Sacred Water Ripples & Soft Golden Ambient Radiance */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.18) 0%, transparent 65%)',
        }}
      />

      {/* Floating Pink Lotus Blossom Left Accent with glowing water reflection */}
      <div className="absolute bottom-3 left-2 sm:left-4 w-14 h-14 sm:w-16 sm:h-16 pointer-events-none opacity-90 select-none drop-shadow-[0_4px_14px_rgba(244,63,94,0.5)]">
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path d="M32 8 C36 22, 46 28, 32 46 C18 28, 28 22, 32 8 Z" fill="#FB7185" />
          <path d="M32 16 C39 27, 55 31, 41 48 C29 42, 31 27, 32 16 Z" fill="#F43F5E" opacity="0.95" />
          <path d="M32 16 C25 27, 9 31, 23 48 C35 42, 33 27, 32 16 Z" fill="#F43F5E" opacity="0.95" />
          <path d="M32 25 C45 33, 61 39, 49 52 C37 48, 35 35, 32 25 Z" fill="#E11D48" opacity="0.85" />
          <path d="M32 25 C19 33, 3 39, 15 52 C27 48, 29 35, 32 25 Z" fill="#E11D48" opacity="0.85" />
          <ellipse cx="32" cy="46" rx="6" ry="3" fill="#FEF08A" />
          <ellipse cx="32" cy="54" rx="22" ry="2.5" stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" strokeDasharray="4 2" />
        </svg>
      </div>

      {/* Floating Pink Lotus Blossom Right Accent with glowing water reflection */}
      <div className="absolute bottom-3 right-12 sm:right-16 w-12 h-12 sm:w-14 sm:h-14 pointer-events-none opacity-85 select-none drop-shadow-[0_4px_14px_rgba(244,63,94,0.45)]">
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path d="M32 10 C35 22, 45 28, 32 46 C19 28, 29 22, 32 10 Z" fill="#FB7185" />
          <path d="M32 18 C38 28, 53 32, 40 48 C28 42, 30 28, 32 18 Z" fill="#F43F5E" opacity="0.95" />
          <path d="M32 18 C26 28, 11 32, 24 48 C36 42, 34 28, 32 18 Z" fill="#F43F5E" opacity="0.95" />
          <ellipse cx="32" cy="46" rx="5" ry="2.5" fill="#FEF08A" />
          <ellipse cx="32" cy="53" rx="18" ry="2" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ========================================================
              COL 1: BRAND IDENTITY & SOCIALS (lg:col-span-3)
             ======================================================== */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4 lg:border-r lg:border-white/15 lg:pr-6">
            <div>
              {/* Sacred Sunburst Om Medallion + Brand Titles */}
              <div className="flex items-center space-x-3.5">
                {/* Golden 8-pointed mandala medallion */}
                <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(245,158,11,0.65)]">
                    {/* Outer Gold Sunburst Star */}
                    <g fill="#F59E0B">
                      <polygon points="50,0 55,25 78,10 65,33 90,35 70,50 90,65 65,67 78,90 55,75 50,100 45,75 22,90 35,67 10,65 30,50 10,35 35,33 22,10 45,25" />
                    </g>
                    {/* Secondary Rotating Star Layer */}
                    <g fill="#D97706" opacity="0.85">
                      <polygon points="50,5 60,30 85,20 70,42 95,50 70,58 85,80 60,70 50,95 40,70 15,80 30,58 5,50 30,42 15,20 40,30" />
                    </g>
                  </svg>
                  {/* Central Deep Emerald Ring with Om */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-[#08231E] border border-amber-300 flex items-center justify-center shadow-inner">
                    <span className="text-xl font-serif font-black text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      ॐ
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-white tracking-wide leading-tight drop-shadow-sm">
                    सनातन साधना
                  </h3>
                  <p className="text-[11px] font-serif font-bold text-[#F59E0B] tracking-wide mt-0.5">
                    शुद्ध गणना, शुद्ध ज्ञान, शुद्ध जीवन
                  </p>
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <p className="mt-3 text-[11.5px] sm:text-xs text-gray-300/85 leading-relaxed max-w-[285px]">
                वैदिक गणना पर आधारित पंचांग, कुंडली और धार्मिक साधनों का एक समर्पित मंच।
              </p>
            </div>

            {/* Social Icons Row matching reference image */}
            <div className="flex items-center space-x-2 pt-1">
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 bg-black/20 hover:bg-[#F59E0B] hover:text-black hover:border-amber-400 transition-all flex items-center justify-center text-gray-200"
                title="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 bg-black/20 hover:bg-[#F59E0B] hover:text-black hover:border-amber-400 transition-all flex items-center justify-center text-gray-200"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 bg-black/20 hover:bg-[#F59E0B] hover:text-black hover:border-amber-400 transition-all flex items-center justify-center text-gray-200"
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 bg-black/20 hover:bg-[#F59E0B] hover:text-black hover:border-amber-400 transition-all flex items-center justify-center text-gray-200"
                title="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 bg-black/20 hover:bg-[#F59E0B] hover:text-black hover:border-amber-400 transition-all flex items-center justify-center text-gray-200"
                title="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ========================================================
              MIDDLE: 3 NAVIGATION COLUMNS (lg:col-span-4)
             ======================================================== */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3 sm:gap-4 lg:border-r lg:border-white/15 lg:px-4">
            
            {/* 1. त्वरित लिंक */}
            <div className="space-y-2.5">
              <h4 className="text-xs sm:text-sm font-extrabold font-serif text-[#FBBF24] tracking-wide">
                त्वरित लिंक
              </h4>
              <ul className="space-y-2 text-[11px] sm:text-xs text-gray-300/85">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/panchang')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    आज का पंचांग
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/kundli')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    जन्म कुंडली
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/matchmaking')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    कुंडली मिलान
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/muhurat')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    शुभ मुहूर्त
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/choghadiya')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    चौघड़िया
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/utilities')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    राशि-फल
                  </button>
                </li>
              </ul>
            </div>

            {/* 2. धार्मिक टूल्स */}
            <div className="space-y-2.5">
              <h4 className="text-xs sm:text-sm font-extrabold font-serif text-[#FBBF24] tracking-wide">
                धार्मिक टूल्स
              </h4>
              <ul className="space-y-2 text-[11px] sm:text-xs text-gray-300/85">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/calendar')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    व्रत एवं त्यौहार
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/calendar')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    हिंदू कैलेंडर
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/kundli')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    ग्रह स्थिति
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/cities')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    मंदिर दर्शन
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/utilities')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    साधना एवं पूजा
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/utilities')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    नामकरण
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. सहायता */}
            <div className="space-y-2.5">
              <h4 className="text-xs sm:text-sm font-extrabold font-serif text-[#FBBF24] tracking-wide">
                सहायता
              </h4>
              <ul className="space-y-2 text-[11px] sm:text-xs text-gray-300/85">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/about-us')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    हमारे बारे में
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/about-us')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    अक्सर पूछे जाने वाले प्रश्न
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/privacy-policy')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    गोपनीयता नीति
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/terms')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    नियम एवं शर्तें
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/about-us')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    संपर्क करें
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* ========================================================
              RIGHT: APP DOWNLOAD, NEWSLETTER & COPYRIGHT ROW (lg:col-span-5)
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-2">
            
            {/* Top row: App Download & Newsletter side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              
              {/* App download */}
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-extrabold font-serif text-[#FBBF24] tracking-wide">
                  हमारा ऐप डाउनलोड करें
                </h4>
                <div className="flex items-center space-x-2">
                  {/* Google Play */}
                  <a
                    href="#playstore"
                    className="flex items-center space-x-1.5 bg-black/80 hover:bg-black text-white px-2.5 py-1.5 rounded-lg border border-white/20 transition-all hover:scale-102"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M3.6 1.4L13.7 11.5 3.6 21.6c-.4-.4-.6-1-.6-1.7V3.1c0-.7.2-1.3.6-1.7z" />
                      <path fill="#FBBC04" d="M17.1 8.1L13.7 11.5l3.4 3.4 3.9-2.2c1.1-.6 1.1-1.7 0-2.3l-3.9-2.3z" />
                      <path fill="#EA4335" d="M13.7 11.5L3.6 1.4c.5-.5 1.4-.6 2.3-.1l11.2 6.8-3.4 3.4z" />
                      <path fill="#34A853" d="M13.7 11.5l3.4 3.4-11.2 6.8c-.9.5-1.8.4-2.3-.1l10.1-10.1z" />
                    </svg>
                    <div className="text-left leading-none">
                      <p className="text-[7.5px] uppercase text-gray-300">GET IT ON</p>
                      <p className="text-[10px] font-bold">Google Play</p>
                    </div>
                  </a>

                  {/* App Store */}
                  <a
                    href="#appstore"
                    className="flex items-center space-x-1.5 bg-black/80 hover:bg-black text-white px-2.5 py-1.5 rounded-lg border border-white/20 transition-all hover:scale-102"
                  >
                    <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.86.94-2.95-1 .04-2.22.67-2.93 1.5-.56.65-1.05 1.76-.92 2.82 1.12.09 2.28-.59 2.91-1.37z" />
                    </svg>
                    <div className="text-left leading-none">
                      <p className="text-[7.5px] uppercase text-gray-300">Download on the</p>
                      <p className="text-[10px] font-bold">App Store</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-extrabold font-serif text-[#FBBF24] tracking-wide">
                  धार्मिक ज्ञान एवं अपडेट पाएं
                </h4>
                <form onSubmit={handleSubscribe} className="flex items-center shadow-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="अपना ईमेल दर्ज करें"
                    required
                    className="bg-white text-gray-900 text-xs px-2.5 py-1.5 sm:py-2 rounded-l-md w-full focus:outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className="bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold px-3 py-1.5 sm:py-2 rounded-r-md transition-colors cursor-pointer shrink-0"
                  >
                    सदस्यता लें
                  </button>
                </form>
                {isSubscribed && (
                  <p className="text-[10px] text-emerald-400 flex items-center space-x-1 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>धन्यवाद! आपकी सदस्यता सफल रही।</span>
                  </p>
                )}
              </div>

            </div>

            {/* Bottom Row: Copyright + Legal links + Back to top button */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-300/80 gap-3">
              <p className="text-center sm:text-left shrink-0">
                © 2026 सनातन साधना. सर्वाधिकार सुरक्षित.
              </p>

              <div className="flex items-center space-x-2 sm:space-x-3 text-[10.5px] text-center">
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  नियम एवं शर्तें
                </button>
                <span className="text-gray-500">|</span>
                <button
                  type="button"
                  onClick={() => navigate('/privacy-policy')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  गोपनीयता नीति
                </button>
                <span className="text-gray-500">|</span>
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  अस्वीकरण
                </button>
                <span className="text-gray-500">|</span>
                <button
                  type="button"
                  onClick={() => navigate('/sitemap')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  साइटमैप
                </button>
              </div>

              {/* Back to top circular button */}
              <button
                type="button"
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-[#051C17] border border-[#D4AF37]/60 hover:border-amber-400 text-amber-300 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer shrink-0"
                title="शीर्ष पर वापस जाएं"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default SanatanFooter;
