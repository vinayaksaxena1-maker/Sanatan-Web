import React from 'react';
import { Link } from '../../../routes/AppRoutes';

export const PortalFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#26160e] text-[#f7f2e6] mt-16 border-t-2 border-[#b8860b] font-serif">
      {/* Sacred Shanti Mantra Strip */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 flex flex-col items-center justify-center text-center bg-[#1d1009]/95 border-b border-[#3e2417]">
        <div className="text-[#f2ca50] text-xl sm:text-2xl font-bold tracking-wider mb-2">
          ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥
        </div>
        <p className="text-xs sm:text-sm text-[#d4af37]/80 tracking-widest font-semibold">
          हे प्रभु! हमें असत्य से सत्य की ओर, अंधकार से प्रकाश की ओर, एवं मृत्यु से अमरता की ओर ले चलिए।
        </p>
      </div>

      {/* Main Footer Columns */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto text-sm">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-[#382012] border border-[#523320] text-2xl text-[#f2ca50]">
              🕉️
            </div>
            <span className="text-xl font-bold text-[#f2ca50]">वेद ज्योतिष केंद्र</span>
          </div>
          <p className="text-xs text-[#d9c5b2] leading-relaxed max-w-md">
            प्रामाणिक वैदिक ज्योतिष एवं सनातन खगोलीय गणनाओं को समर्पित संस्थान। सूर्य-सिद्धांत, द्रिक गणित एवं महर्षि पराशर की कालजयी संहिताओं पर आधारित शुद्ध भविष्यफल।
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#382012] border border-[#523320] text-[#f2ca50]">
              चित्रपक्षीय अयनांश
            </span>
            <span className="px-3 py-1 rounded-full bg-[#382012] border border-[#523320] text-[#f2ca50]">
              द्रिक सिद्धांत
            </span>
            <span className="px-3 py-1 rounded-full bg-[#382012] border border-[#523320] text-[#f2ca50]">
              काशी पंचांग संवत
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-bold text-[#f2ca50]">पंचांग एवं काल गणना</h4>
          <ul className="space-y-2 text-xs text-[#d9c5b2]">
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/panchang">आज का दैनिक पंचांग</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/choghadiya">दिन व रात्रि चौघड़िया</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/hora">२४-घंटे होरा चक्र</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/muhurat">शुभ मुहूर्त एवं संस्कार</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/calendar">व्रत एवं एकादशी सारणी</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-bold text-[#f2ca50]">कुण्डली एवं ज्योतिष</h4>
          <ul className="space-y-2 text-xs text-[#d9c5b2]">
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/kundli">जन्म कुण्डली (D1-D60)</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/matchmaking">कुण्डली मिलान (३६ गुण)</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/utilities">१९ वैदिक सुविधाएं व उपाय</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/cities">नगर / शहर एटलस (५,०००+)</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/settings">अयनांश एवं सेटिंग्स</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-bold text-[#f2ca50]">संस्था एवं नीतियां</h4>
          <ul className="space-y-2 text-xs text-[#d9c5b2]">
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/">सनातन घड़ी मुख्य पृष्ठ</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/about-us">हमारे बारे में व परंपरा</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/privacy-policy">गोपनीयता नीति</Link></li>
            <li><Link className="hover:text-[#ea580c] transition-colors no-underline" href="/terms">नियम व शर्तें</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Dharmic Disclaimers */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-4 bg-[#1d1009] border-t border-[#382012] flex flex-col md:flex-row items-center justify-between text-[#a8907f] text-xs gap-3">
        <div>© २०२६ वेद ज्योतिष केंद्र • सर्वधर्म सद्भाव एवं सनातन वैदिक न्यास। सर्वाधिकार सुरक्षित।</div>
        <div className="flex items-center gap-6">
          <a className="hover:text-[#f2ca50] transition-colors no-underline" href="#">मूल संस्कृत ग्रंथ</a>
          <a className="hover:text-[#f2ca50] transition-colors no-underline" href="#">खगोलीय शुद्धता</a>
          <Link className="hover:text-[#f2ca50] transition-colors no-underline" href="/privacy-policy">गोपनीयता नीति</Link>
          <Link className="hover:text-[#f2ca50] transition-colors no-underline" href="/terms">नियम व शर्तें</Link>
        </div>
      </div>
    </footer>
  );
};
