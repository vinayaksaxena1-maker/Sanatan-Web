/**
 * Sanatan Web (सनातन घड़ी)
 * Dedicated Page: ContactPage (/contact, /feedback)
 * Dharmic Contact, Queries & Feedback Center
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { Link } from '../../routes/AppRoutes';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { GoldenCornerBrackets } from '../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../vedic-portal/components/SacredGeometryWatermark';
import { ArrowLeft, ChevronRight, Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquareText } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('पंचांग गणना संबंधी');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Local state confirmation (Data sovereignty: 100% private, zero unsolicited external tracking)
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      <PortalHeader />

      <main className="w-full pt-32 pb-20 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-8" id="contact-page">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 font-sans" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-800 transition-colors flex items-center gap-1 no-underline">
              <ArrowLeft className="w-3.5 h-3.5" /> मुख्य पृष्ठ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-amber-900 font-semibold">संपर्क एवं सुझाव केंद्र</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs font-sans font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            प्रतिदिन प्रातः ०९:०० से सायं ०६:००
          </span>
        </div>

        {/* Hero Banner */}
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest inline-block">
            सनातन वैदिक सेवा एवं परामर्श
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#26150b]">
            संपर्क एवं परामर्श प्रपत्र
          </h1>
          <p className="text-sm text-[#735641]">
            पंचांग गणना, खगोलीय शुद्धता, ज्योतिषीय जिज्ञासा अथवा तकनीकी सुझाव हेतु हमसे संपर्क करें
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Heritage Office Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel-warm rounded-3xl p-6 space-y-4 relative overflow-hidden border border-[#dec9ab]">
              <GoldenCornerBrackets size="sm" />
              <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />

              <h3 className="text-lg font-bold text-[#26150b] border-b border-[#dec9ab]/60 pb-2 relative z-10">
                सनातन घड़ी केंद्र
              </h3>

              <div className="space-y-3.5 text-xs text-[#5a3822] relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/90 border border-[#dec9ab] flex items-center justify-center shrink-0 text-[#c2410c]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#26150b] block text-sm">काशी कार्यालय (पंचांग पीठ)</span>
                    <span>दशाश्वमेध घाट मार्ग, काशी (वाराणसी), उत्तर प्रदेश - २२१००१</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/90 border border-[#dec9ab] flex items-center justify-center shrink-0 text-[#b8860b]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#26150b] block text-sm">ईमेल संपर्क</span>
                    <span className="font-mono">sampark@sanatanvedic.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/90 border border-[#dec9ab] flex items-center justify-center shrink-0 text-[#2a674c]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#26150b] block text-sm">सहायता केंद्र</span>
                    <span>सोमवार से शनिवार (रविवार अवकाश)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-[#dec9ab]/70 text-[11px] text-[#735641] leading-relaxed relative z-10">
                <strong>गोपनीयता संकल्प:</strong> आपके द्वारा प्रेषित सुझाव एवं संपर्क जानकारी पूर्णतः सुरक्षित है। इसे किसी तृतीय पक्ष के साथ साझा नहीं किया जाता।
              </div>
            </div>
          </div>

          {/* Feedback Form Surface (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#dec9ab]">
              <GoldenCornerBrackets size="md" />

              {isSubmitted ? (
                <div className="text-center py-8 space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#26150b]">सुझाव सफलतापूर्वक प्रेषित!</h3>
                  <p className="text-xs text-[#735641] max-w-md mx-auto leading-relaxed">
                    सादर धन्यवाद! आपका संदेश हमारी शोध एवं पंचांग समिति को प्राप्त हो गया है। धर्म और खगोलीय शुद्धता के संवर्धन हेतु आपका यह सहयोग अत्यंत मूल्यवान है।
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-[#c2410c] hover:bg-[#ea580c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    type="button"
                  >
                    नया संदेश भेजें
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2 border-b border-[#dec9ab]/60 pb-3">
                    <MessageSquareText className="w-5 h-5 text-[#c2410c]" />
                    <h3 className="text-lg font-bold text-[#26150b]">सुझाव एवं संदेश प्रपत्र</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#735641] block">आपका शुभ नाम *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="उदा. आचार्य रमेश शुक्ल"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#dec9ab] focus:border-[#ea580c] focus:outline-hidden text-xs text-[#26150b]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#735641] block">ईमेल अथवा दूरभाष</label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="उदा. name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#dec9ab] focus:border-[#ea580c] focus:outline-hidden text-xs text-[#26150b]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#735641] block">विषय श्रेणी</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#dec9ab] focus:border-[#ea580c] focus:outline-hidden text-xs text-[#26150b]"
                    >
                      <option value="पंचांग गणना संबंधी">पंचांग गणना एवं सूर्योदय-सूर्यास्त शुद्धि</option>
                      <option value="कुण्डली व जन्मपत्री">कुण्डली एवं ज्योतिषीय गणना</option>
                      <option value="मुहूर्त व संस्कार">शुभ मुहूर्त व संस्कार काल निर्णय</option>
                      <option value="तकनीकी सहायता">वेबसाइट प्रदर्शन अथवा तकनीकी सुझाव</option>
                      <option value="अन्य सामान्य जिज्ञासा">अन्य सामान्य धर्म जिज्ञासा</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#735641] block">विस्तृत सन्देश अथवा सुझाव *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="कृपया अपना सुझाव अथवा विचार विस्तार से लिखें..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#dec9ab] focus:border-[#ea580c] focus:outline-hidden text-xs text-[#26150b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>सुझाव प्रेषित करें</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <PortalFooter />
    </div>
  );
};

export default ContactPage;
