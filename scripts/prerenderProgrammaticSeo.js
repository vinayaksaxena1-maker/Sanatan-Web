/**
 * Sanatan Ghadi (सनातन घड़ी)
 * High-Speed Zero-Conflict Programmatic SEO Generator
 * Pre-renders 500+ static HTML route shells with semantic JSON-LD microdata,
 * OpenGraph tags, and SEO metadata into dist/[hub]/[slug]/index.html.
 * Generates sitemap.xml indexing all 500+ URLs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const publicDir = path.resolve(projectRoot, 'public');

const SITE_URL = 'https://sanatan-web.vercel.app';

// 1. Top 100 Indian & Global Pilgrimage Cities
const CITIES = [
  { slug: 'delhi', hi: 'दिल्ली', state: 'राष्ट्रीय राजधानी क्षेत्र' },
  { slug: 'varanasi', hi: 'वाराणसी (काशी)', state: 'उत्तर प्रदेश' },
  { slug: 'ujjain', hi: 'उज्जैन (अवंतिका)', state: 'मध्य प्रदेश' },
  { slug: 'ayodhya', hi: 'अयोध्या धाम', state: 'उत्तर प्रदेश' },
  { slug: 'mathura', hi: 'मथुरा', state: 'उत्तर प्रदेश' },
  { slug: 'vrindavan', hi: 'वृंदावन', state: 'उत्तर प्रदेश' },
  { slug: 'haridwar', hi: 'हरिद्वार', state: 'उत्तराखंड' },
  { slug: 'rishikesh', hi: 'ऋषिकेश', state: 'उत्तराखंड' },
  { slug: 'prayagraj', hi: 'प्रयागराज (तीर्थराज)', state: 'उत्तर प्रदेश' },
  { slug: 'puri', hi: 'पुरी (जगन्नाथ धाम)', state: 'ओडिशा' },
  { slug: 'dwarka', hi: 'द्वारका धाम', state: 'गुजरात' },
  { slug: 'badrinath', hi: 'बद्रीनाथ धाम', state: 'उत्तराखंड' },
  { slug: 'kedarnath', hi: 'केदारनाथ धाम', state: 'उत्तराखंड' },
  { slug: 'tirupati', hi: 'तिरुपति बालाजी', state: 'आंध्र प्रदेश' },
  { slug: 'madurai', hi: 'मदुरै (मीनाक्षी अम्मन)', state: 'तमिलनाडु' },
  { slug: 'rameswaram', hi: 'रामेश्वरम धाम', state: 'तमिलनाडु' },
  { slug: 'kanchipuram', hi: 'कांचीपुरम', state: 'तमिलनाडु' },
  { slug: 'somnath', hi: 'सोमनाथ ज्योतिर्लिंग', state: 'गुजरात' },
  { slug: 'shirdi', hi: 'शिरडी', state: 'महाराष्ट्र' },
  { slug: 'mumbai', hi: 'मुंबई', state: 'महाराष्ट्र' },
  { slug: 'kolkata', hi: 'कोलकाता', state: 'पश्चिम बंगाल' },
  { slug: 'bengaluru', hi: 'बेंगलुरु', state: 'कर्नाटक' },
  { slug: 'chennai', hi: 'चेन्नई', state: 'तमिलनाडु' },
  { slug: 'hyderabad', hi: 'हैदराबाद', state: 'तेलंगाना' },
  { slug: 'ahmedabad', hi: 'अहमदाबाद', state: 'गुजरात' },
  { slug: 'pune', hi: 'पुणे', state: 'महाराष्ट्र' },
  { slug: 'jaipur', hi: 'जयपुर', state: 'राजस्थान' },
  { slug: 'lucknow', hi: 'लखनऊ', state: 'उत्तर प्रदेश' },
  { slug: 'kanpur', hi: 'कानपुर', state: 'उत्तर प्रदेश' },
  { slug: 'nagpur', hi: 'नागपुर', state: 'महाराष्ट्र' },
  { slug: 'indore', hi: 'इंदौर', state: 'मध्य प्रदेश' },
  { slug: 'bhopal', hi: 'भोपाल', state: 'मध्य प्रदेश' },
  { slug: 'patna', hi: 'पटना', state: 'बिहार' },
  { slug: 'gaya', hi: 'गया (पितृ तीर्थ)', state: 'बिहार' },
  { slug: 'vadodara', hi: 'वडोदरा', state: 'गुजरात' },
  { slug: 'surat', hi: 'सूरत', state: 'गुजरात' },
  { slug: 'rajkot', hi: 'राजकोट', state: 'गुजरात' },
  { slug: 'chandigarh', hi: 'चंडीगढ़', state: 'पंजाब / हरियाणा' },
  { slug: 'amritsar', hi: 'अमृतसर', state: 'पंजाब' },
  { slug: 'jodhpur', hi: 'जोधपुर', state: 'राजस्थान' },
  { slug: 'udaipur', hi: 'उदयपुर', state: 'राजस्थान' },
  { slug: 'pushkar', hi: 'पुष्कर', state: 'राजस्थान' },
  { slug: 'nashik', hi: 'नासिक (त्र्यंबकेश्वर)', state: 'महाराष्ट्र' },
  { slug: 'dehradun', hi: 'देहरादून', state: 'उत्तराखंड' },
  { slug: 'shimla', hi: 'शिमला', state: 'हिमाचल प्रदेश' },
  { slug: 'dharamshala', hi: 'धर्मशाला', state: 'हिमाचल प्रदेश' },
  { slug: 'jammu', hi: 'जम्मू (वैष्णो देवी)', state: 'जम्मू और कश्मीर' },
  { slug: 'srinagar', hi: 'श्रीनगर', state: 'जम्मू और कश्मीर' },
  { slug: 'guwahati', hi: 'गुवाहाटी (कामाख्या पीठ)', state: 'असम' },
  { slug: 'raipur', hi: 'रायपुर', state: 'छत्तीसगढ़' },
  { slug: 'ranchi', hi: 'रांची', state: 'झारखंड' },
  { slug: 'deoghar', hi: 'देवघर (बाबा बैद्यनाथ)', state: 'झारखंड' },
  { slug: 'bhubaneswar', hi: 'भुवनेश्वर (लिंगराज)', state: 'ओडिशा' },
  { slug: 'cuttack', hi: 'कटक', state: 'ओडिशा' },
  { slug: 'gwalior', hi: 'ग्वालियर', state: 'मध्य प्रदेश' },
  { slug: 'jabalpur', hi: 'जबलपुर', state: 'मध्य प्रदेश' },
  { slug: 'kota', hi: 'कोटा', state: 'राजस्थान' },
  { slug: 'aligarh', hi: 'अलीगढ़', state: 'उत्तर प्रदेश' },
  { slug: 'bareilly', hi: 'बरेली', state: 'उत्तर प्रदेश' },
  { slug: 'meerut', hi: 'मेरठ', state: 'उत्तर प्रदेश' },
  { slug: 'moradabad', hi: 'मुरादाबाद', state: 'उत्तर प्रदेश' },
  { slug: 'gorakhpur', hi: 'गोरखपुर (गोरखनाथ पीठ)', state: 'उत्तर प्रदेश' },
  { slug: 'jhansi', hi: 'झांसी', state: 'उत्तर प्रदेश' },
  { slug: 'chitrakoot', hi: 'चित्रकूट धाम', state: 'उत्तर प्रदेश / म.प्र.' },
  { slug: 'kurukshetra', hi: 'कुरुक्षेत्र (गीता स्थली)', state: 'हरियाणा' },
  { slug: 'panipat', hi: 'पानीपत', state: 'हरियाणा' },
  { slug: 'karnal', hi: 'करनाल', state: 'हरियाणा' },
  { slug: 'ajmer', hi: 'अजमेर', state: 'राजस्थान' },
  { slug: 'bikaner', hi: 'बीकानेर', state: 'राजस्थान' },
  { slug: 'mysuru', hi: 'मैसूरु (चामुंडेश्वरी)', state: 'कर्नाटक' },
  { slug: 'mangaluru', hi: 'मंगलुरु', state: 'कर्नाटक' },
  { slug: 'hampi', hi: 'हम्पी (किष्किंधा)', state: 'कर्नाटक' },
  { slug: 'udupi', hi: 'उडुपी (श्रीकृष्ण मठ)', state: 'कर्नाटक' },
  { slug: 'coimbatore', hi: 'कोयंबटूर', state: 'तमिलनाडु' },
  { slug: 'thanjavur', hi: 'तंजावुर (बृहदीश्वर)', state: 'तमिलनाडु' },
  { slug: 'thiruvananthapuram', hi: 'तिरुवनंतपुरम (पद्मनाभस्वामी)', state: 'केरल' },
  { slug: 'kochi', hi: 'कोच्चि', state: 'केरल' },
  { slug: 'guruvayur', hi: 'गुरुवायुर', state: 'केरल' },
  { slug: 'visakhapatnam', hi: 'विशाखापत्तनम', state: 'आंध्र प्रदेश' },
  { slug: 'vijayawada', hi: 'विजयवाड़ा (कनक दुर्गा)', state: 'आंध्र प्रदेश' },
  { slug: 'warangal', hi: 'वारंगल', state: 'तेलंगाना' },
  { slug: 'kolhapur', hi: 'कोल्हापुर (महालक्ष्मी)', state: 'महाराष्ट्र' },
  { slug: 'aurangabad', hi: 'छत्रपति संभाजीनगर (घृष्णेश्वर)', state: 'महाराष्ट्र' },
  { slug: 'amravati', hi: 'अमरावती', state: 'महाराष्ट्र' },
  { slug: 'solapur', hi: 'सोलापुर', state: 'महाराष्ट्र' },
  { slug: 'salem', hi: 'सेलम', state: 'तमिलनाडु' },
  { slug: 'tiruchirappalli', hi: 'तिरुचिरापल्ली (श्रीरंगम)', state: 'तमिलनाडु' },
  { slug: 'hubli', hi: 'हुबली', state: 'कर्नाटक' },
  { slug: 'belagavi', hi: 'बेलगावी', state: 'कर्नाटक' },
  { slug: 'kathmandu', hi: 'काठमांडू (पशुपतिनाथ)', state: 'नेपाल' },
  { slug: 'pokhara', hi: 'पोखरा', state: 'नेपाल' },
  { slug: 'janakpur', hi: 'जनकपुर धाम', state: 'नेपाल' },
  { slug: 'london', hi: 'लंदन', state: 'यूनाइटेड किंगडम' },
  { slug: 'new-york', hi: 'न्यू यॉर्क', state: 'संयुक्त राज्य अमेरिका' },
  { slug: 'toronto', hi: 'टोरंटो', state: 'कनाडा' },
  { slug: 'dubai', hi: 'दुबई', state: 'संयुक्त अरब अमीरात' },
  { slug: 'singapore', hi: 'सिंगापुर', state: 'सिंगापुर' },
  { slug: 'sydney', hi: 'सिडनी', state: 'ऑस्ट्रेलिया' },
  { slug: 'melbourne', hi: 'मेलबर्न', state: 'ऑस्ट्रेलिया' },
  { slug: 'port-louis', hi: 'पोर्ट लुईस', state: 'मॉरीशस' }
];

// 2. 55 Major Vedic Festivals & Vrats
const FESTIVALS = [
  { slug: 'diwali', hi: 'दीपावली (लक्ष्मी पूजन)', deity: 'माँ महालक्ष्मी', desc: 'कार्तिक अमावस्या महालक्ष्मी पूजन व दीप उत्सव' },
  { slug: 'maha-shivratri', hi: 'महाशिवरात्रि', deity: 'भगवान शिव', desc: 'फाल्गुन कृष्ण चतुर्दशी शिव-पार्वती महाउत्सव' },
  { slug: 'holi', hi: 'होलिका दहन एवं होली', deity: 'भगवान नृसिंह व भक्त प्रह्लाद', desc: 'फाल्गुन पूर्णिमा रंगोत्सव व बुराई पर अच्छाई की विजय' },
  { slug: 'ram-navami', hi: 'श्री राम नवमी', deity: 'मर्यादा पुरुषोत्तम भगवान श्री राम', desc: 'चैत्र शुक्ल नवमी श्री राम जन्मोत्सव' },
  { slug: 'krishna-janmashtami', hi: 'श्री कृष्ण जन्माष्टमी', deity: 'योगेश्वर भगवान श्री कृष्ण', desc: 'भाद्रपद कृष्ण अष्टमी रोहिणी नक्षत्र मध्यरात्रि जन्मोत्सव' },
  { slug: 'durga-puja', hi: 'दुर्गा पूजा एवं विजयादशमी', deity: 'माँ दुर्गा', desc: 'आश्विन शुक्ल पक्ष दुर्गोत्सव व शस्त्र पूजन' },
  { slug: 'chaitra-navratri', hi: 'चैत्र नवरात्रि (वासंतिक)', deity: 'नवदुर्गा', desc: 'चैत्र शुक्ल प्रतिपदा से नवमी तक नवदुर्गा साधना' },
  { slug: 'shardiya-navratri', hi: 'शारदीय नवरात्रि', deity: 'नवदुर्गा', desc: 'आश्विन शुक्ल प्रतिपदा से घटस्थापना व डांडिया महोत्सव' },
  { slug: 'ganesh-chaturthi', hi: 'गणेश चतुर्थी (विनायक उत्सव)', deity: 'विघ्नहर्ता भगवान गणेश', desc: 'भाद्रपद शुक्ल चतुर्थी गणेश स्थापना व अनंत चतुर्दशी' },
  { slug: 'raksha-bandhan', hi: 'रक्षाबंधन', deity: 'देवराज इंद्र व भ्रातृ-भगिनी स्नेह', desc: 'श्रावण पूर्णिमा पवित्र रक्षा सूत्र बंधन' },
  { slug: 'karwa-chauth', hi: 'करवा चौथ (करक चतुर्थी)', deity: 'माता पार्वती व चंद्रमा', desc: 'कार्तिक कृष्ण चतुर्थी सौभाग्यवती स्त्रियों का निर्जला व्रत व चंद्र अर्घ्य' },
  { slug: 'nirjala-ekadashi', hi: 'निर्जला एकादशी (भीमसेनी)', deity: 'भगवान श्री विष्णु', desc: 'ज्येष्ठ शुक्ल एकादशी वर्ष की सबसे पुण्यदायी निर्जला व्रत' },
  { slug: 'devshayani-ekadashi', hi: 'देवशयनी एकादशी (चातुर्मास आरंभ)', deity: 'भगवान श्री हरि विष्णु', desc: 'आषाढ़ शुक्ल एकादशी श्री हरि क्षीरसागर में योगनिद्रा' },
  { slug: 'devuthani-ekadashi', hi: 'देवउठनी एकादशी (प्रबोधिनी)', deity: 'भगवान श्री विष्णु व तुलसी माता', desc: 'कार्तिक शुक्ल एकादशी चातुर्मास समाप्ति व तुलसी विवाह' },
  { slug: 'makar-sankranti', hi: 'मकर संक्रांति (उत्तरायण)', deity: 'भगवान सूर्य देव', desc: 'सूर्य का मकर राशि में प्रवेश, पवित्र स्नान व तिल-गुड़ दान' },
  { slug: 'basant-panchami', hi: 'बसंत पंचमी (सरस्वती पूजा)', deity: 'विद्यादायिनी माँ सरस्वती', desc: 'माघ शुक्ल पंचमी ऋतुराज बसंत आगमन व वीणावादिनी पूजन' },
  { slug: 'hanuman-jayanti', hi: 'श्री हनुमान जयंती', deity: 'संकटमोचन श्री हनुमान जी', desc: 'चैत्र पूर्णिमा केसरीनंदन मारुति जन्मोत्सव' },
  { slug: 'guru-purnima', hi: 'गुरु पूर्णिमा (व्यास पूर्णिमा)', deity: 'महर्षि वेदव्यास एवं सद्गुरु', desc: 'आषाढ़ पूर्णिमा गुरु पूजन एवं कृतज्ञता पर्व' },
  { slug: 'nag-panchami', hi: 'नाग पंचमी', deity: 'अष्टकुल नाग देवता', desc: 'श्रावण शुक्ल पंचमी कालसर्प दोष शांति व नाग पूजन' },
  { slug: 'chhath-puja', hi: 'छठ पूजा (सूर्य षष्ठी)', deity: 'छठी मैया व भगवान भास्कर', desc: 'कार्तिक शुक्ल षष्ठी ४-दिवसीय सूर्य उपासना व अर्घ्य' },
  { slug: 'dhanteras', hi: 'धनतेरस (धन्वंतरि त्रयोदशी)', deity: 'भगवान धन्वंतरि व कुबेर देव', desc: 'कार्तिक कृष्ण त्रयोदशी आरोग्य व धन समृद्धि पूजन' },
  { slug: 'bhai-dooj', hi: 'भाई दूज (यम द्वितीया)', deity: 'यमुना जी एवं यमराज', desc: 'कार्तिक शुक्ल द्वितीया भ्रातृ रक्षा व स्नेह पर्व' },
  { slug: 'annakut-govardhan-puja', hi: 'अन्नकूट एवं गोवर्धन पूजा', deity: 'गिरिराज गोवर्धन व भगवान कृष्ण', desc: 'कार्तिक शुक्ल प्रतिपदा ५६ भोग एवं गोधन पूजन' },
  { slug: 'tulsi-vivah', hi: 'तुलसी विवाह', deity: 'तुलसी माता व शालिग्राम जी', desc: 'कार्तिक शुक्ल द्वादशी मांगलिक वैवाहिक उत्सव' },
  { slug: 'geeta-jayanti', hi: 'गीता जयंती', deity: 'श्रीमद्भगवद्गीता व श्री कृष्ण', desc: 'मार्गशीर्ष शुक्ल एकादशी कुरुक्षेत्र में अमृतवाणी' },
  { slug: 'kartik-purnima', hi: 'कार्तिक पूर्णिमा (त्रिपुरारी पूर्णिमा)', deity: 'भगवान शिव व विष्णु', desc: 'कार्तिक पूर्णिमा देव दीपावली व गंगा स्नान' },
  { slug: 'sharad-purnima', hi: 'शरद पूर्णिमा (रास पूर्णिमा)', deity: 'भगवान श्री कृष्ण व चंद्र देव', desc: 'आश्विन पूर्णिमा अमृतमयी खीर प्रसाद व महा रासोत्सव' },
  { slug: 'buddha-purnima', hi: 'बुद्ध पूर्णिमा', deity: 'तथागत भगवान बुद्ध', desc: 'वैशाख पूर्णिमा त्रिविध पावन बुद्ध उत्सव' },
  { slug: 'pitru-paksha', hi: 'पितृ पक्ष (श्राद्ध महालय)', deity: 'पितृ देव', desc: 'भाद्रपद पूर्णिमा से आश्विन अमावस्या पितृ तर्पण' },
  { slug: 'sarva-pitru-amavasya', hi: 'सर्वपितृ अमावस्या', deity: 'समस्त ज्ञात-अज्ञात पितृ', desc: 'आश्विन कृष्ण अमावस्या महालय समाप्ति श्राद्ध' },
  { slug: 'skanda-sasthi', hi: 'स्कंद षष्ठी (मुरुगन उत्सव)', deity: 'भगवान कार्तिकेय (स्कंद)', desc: 'कार्तिकेय विजयोत्सव व षष्ठी व्रत' },
  { slug: 'somvati-amavasya', hi: 'सोमवती अमावस्या', deity: 'भगवान शिव व पीपल वृक्ष', desc: 'सोमवार युक्त अमावस्या १०८ परिक्रमा व पितृ दोष मुक्ति' },
  { slug: 'mauni-amavasya', hi: 'मौनी अमावस्या', deity: 'त्रिवेणी संगम व ऋषिगण', desc: 'माघ कृष्ण अमावस्या मौन व्रत व कुंभ तीर्थ स्नान' },
  { slug: 'radha-ashtami', hi: 'राधा अष्टमी', deity: 'श्री राधारानी', desc: 'भाद्रपद शुक्ल अष्टमी बरसाना राधोत्सव' },
  { slug: 'varuthini-ekadashi', hi: 'वरूथिनी एकादशी', deity: 'वराह भगवान', desc: 'वैशाख कृष्ण एकादशी सौभाग्य एवं मोक्षदायिनी' },
  { slug: 'kamada-ekadashi', hi: 'कामदा एकादशी', deity: 'श्री वासुदेव', desc: 'चैत्र शुक्ल एकादशी समस्त मनोकामना पूर्ण करने वाली' },
  { slug: 'mohini-ekadashi', hi: 'मोहिनी एकादशी', deity: 'मोहिनी रूप भगवान विष्णु', desc: 'वैशाख शुक्ल एकादशी मोहादि बंधनों से मुक्ति' },
  { slug: 'apara-ekadashi', hi: 'अपरा एकादशी', deity: 'त्रिविक्रम भगवान', desc: 'ज्येष्ठ कृष्ण एकादशी अपार धन व यश प्रदायिनी' },
  { slug: 'yogini-ekadashi', hi: 'योगिनी एकादशी', deity: 'भगवान नारायण', desc: 'आषाढ़ कृष्ण एकादशी कुष्ठ व शारीरिक व्याधि नाशिनी' },
  { slug: 'kamika-ekadashi', hi: 'कामिका एकादशी', deity: 'श्री हरि विष्णु', desc: 'श्रावण कृष्ण एकादशी पूर्व जन्म पाप विनाशिनी' },
  { slug: 'shravana-putrada-ekadashi', hi: 'पवित्रा एकादशी (पुत्रदा)', deity: 'भगवान विष्णु', desc: 'श्रावण शुक्ल एकादशी पवित्र संतान प्राप्ति व्रत' },
  { slug: 'aja-ekadashi', hi: 'अजा एकादशी', deity: 'भगवान ऋषिकेश', desc: 'भाद्रपद कृष्ण एकादशी सत्यवादी राजा हरिश्चंद्र उद्धार' },
  { slug: 'parivartini-ekadashi', hi: 'परिवर्तिनी एकादशी (वामन)', deity: 'भगवान वामन', desc: 'भाद्रपद शुक्ल एकादशी श्री हरि का करवट बदलना' },
  { slug: 'indira-ekadashi', hi: 'इंदिरा एकादशी', deity: 'भगवान पद्मनाभ', desc: 'आश्विन कृष्ण एकादशी पितरों को वैकुंठ मुक्ति प्रदायिनी' },
  { slug: 'papankusha-ekadashi', hi: 'पापांकुशा एकादशी', deity: 'भगवान पद्मनाभ', desc: 'आश्विन शुक्ल एकादशी समस्त पापों पर अंकुश' },
  { slug: 'rama-ekadashi', hi: 'रमा एकादशी', deity: 'माँ लक्ष्मी व केशव', desc: 'कार्तिक कृष्ण एकादशी लक्ष्मी कृपा व सुख समृद्धि' },
  { slug: 'utpanna-ekadashi', hi: 'उत्पन्ना एकादशी', deity: 'एकादशी देवी व श्री हरि', desc: 'मार्गशीर्ष कृष्ण एकादशी एकादशी तिथि का प्राकट्य' },
  { slug: 'mokshada-ekadashi', hi: 'मोक्षदा एकादशी', deity: 'भगवान दामोदर', desc: 'मार्गशीर्ष शुक्ल एकादशी गीता जयंती एवं मोक्ष प्राप्ति' },
  { slug: 'saphala-ekadashi', hi: 'सफला एकादशी', deity: 'भगवान अच्युत', desc: 'पौष कृष्ण एकादशी सभी कार्यों में सफलता' },
  { slug: 'pausha-putrada-ekadashi', hi: 'पौष पुत्रदा एकादशी', deity: 'भगवान नारायण', desc: 'पौष शुक्ल एकादशी सुयोग्य संतान प्राप्ति' },
  { slug: 'shattila-ekadashi', hi: 'षटतिला एकादशी', deity: 'भगवान विष्णु', desc: 'माघ कृष्ण एकादशी ६ प्रकार के तिल प्रयोग व दान' },
  { slug: 'jaya-ekadashi', hi: 'जया एकादशी', deity: 'भगवान माधव', desc: 'माघ शुक्ल एकादशी पिशाच योनि से मुक्ति व विजय' },
  { slug: 'vijaya-ekadashi', hi: 'विजया एकादशी', deity: 'श्री रामचंद्र', desc: 'फाल्गुन कृष्ण एकादशी समुद्र लंघन व विजय संकल्प' },
  { slug: 'amalaki-ekadashi', hi: 'आमलकी एकादशी (रंगभरी)', deity: 'भगवान परशुराम व आंवला वृक्ष', desc: 'फाल्गुन शुक्ल एकादशी काशी विश्वनाथ रंगभरी एकादशी' },
  { slug: 'papmochani-ekadashi', hi: 'पापमोचिनी एकादशी', deity: 'भगवान चतुर्भुज', desc: 'चैत्र कृष्ण एकादशी संवत समापन व पाप मुक्ति' }
];

// 3. 27 Nakshatras
const NAKSHATRAS = [
  { slug: 'ashwini', hi: 'अश्विनी', lord: 'केतु', deity: 'अश्विनी कुमार' },
  { slug: 'bharani', hi: 'भरणी', lord: 'शुक्र', deity: 'यमराज' },
  { slug: 'krittika', hi: 'कृत्तिका', lord: 'सूर्य', deity: 'अग्नि देव' },
  { slug: 'rohini', hi: 'रोहिणी', lord: 'चंद्रमा', deity: 'ब्रह्मा जी' },
  { slug: 'mrigashira', hi: 'मृगशिरा', lord: 'मंगल', deity: 'चंद्र देव (सोम)' },
  { slug: 'ardra', hi: 'आर्द्रा', lord: 'राहु', deity: 'रुद्र (शिव)' },
  { slug: 'punarvasu', hi: 'पुनर्वसु', lord: 'बृहस्पति', deity: 'माता अदिति' },
  { slug: 'pushya', hi: 'पुष्य (नक्षत्र सम्राट)', lord: 'शनि', deity: 'देवगुरु बृहस्पति' },
  { slug: 'ashlesha', hi: 'आश्लेषा', lord: 'बुध', deity: 'नाग देवता' },
  { slug: 'magha', hi: 'मघा', lord: 'केतु', deity: 'पितृ गण' },
  { slug: 'purva-phalguni', hi: 'पूर्वाफाल्गुनी', lord: 'शुक्र', deity: 'भग देव' },
  { slug: 'uttara-phalguni', hi: 'उत्तराफाल्गुनी', lord: 'सूर्य', deity: 'अर्यमा' },
  { slug: 'hasta', hi: 'हस्त', lord: 'चंद्रमा', deity: 'सूर्य (सविता)' },
  { slug: 'chitra', hi: 'चित्रा', lord: 'मंगल', deity: 'विश्वकर्मा जी' },
  { slug: 'swati', hi: 'स्वाति', lord: 'राहु', deity: 'पवन देव (वायु)' },
  { slug: 'vishakha', hi: 'विशाखा', lord: 'बृहस्पति', deity: 'इंद्राग्नि' },
  { slug: 'anuradha', hi: 'अनुराधा', lord: 'शनि', deity: 'मित्र देव' },
  { slug: 'jyeshtha', hi: 'ज्येष्ठा', lord: 'बुध', deity: 'देवराज इंद्र' },
  { slug: 'mula', hi: 'मूल', lord: 'केतु', deity: 'निरृति' },
  { slug: 'purva-ashadha', hi: 'पूर्वाषाढ़ा', lord: 'शुक्र', deity: 'जल देव (वरुण)' },
  { slug: 'uttara-ashadha', hi: 'उत्तराषाढ़ा', lord: 'सूर्य', deity: 'विश्वेदेव' },
  { slug: 'shravana', hi: 'श्रवण', lord: 'चंद्रमा', deity: 'भगवान श्री विष्णु' },
  { slug: 'dhanishta', hi: 'धनिष्ठा', lord: 'मंगल', deity: 'अष्ट वसु' },
  { slug: 'shatabhisha', hi: 'शतभिषा', lord: 'राहु', deity: 'वरुण देव' },
  { slug: 'purva-bhadrapada', hi: 'पूर्वाभाद्रपद', lord: 'बृहस्पति', deity: 'अजैकपाद' },
  { slug: 'uttara-bhadrapada', hi: 'उत्तराभाद्रपद', lord: 'शनि', deity: 'अहिर्बुध्न्य' },
  { slug: 'revati', hi: 'रेवती', lord: 'बुध', deity: 'पूषा देव' }
];

// 4. 12 Rashis
const RASHIS = [
  { slug: 'mesha', hi: 'मेष राशि', en: 'Aries', lord: 'मंगल', element: 'अग्नि' },
  { slug: 'vrishabha', hi: 'वृषभ राशि', en: 'Taurus', lord: 'शुक्र', element: 'पृथ्वी' },
  { slug: 'mithuna', hi: 'मिथुन राशि', en: 'Gemini', lord: 'बुध', element: 'वायु' },
  { slug: 'karka', hi: 'कर्क राशि', en: 'Cancer', lord: 'चंद्रमा', element: 'जल' },
  { slug: 'simha', hi: 'सिंह राशि', en: 'Leo', lord: 'सूर्य', element: 'अग्नि' },
  { slug: 'kanya', hi: 'कन्या राशि', en: 'Virgo', lord: 'बुध', element: 'पृथ्वी' },
  { slug: 'tula', hi: 'तुला राशि', en: 'Libra', lord: 'शुक्र', element: 'वायु' },
  { slug: 'vrishchika', hi: 'वृश्चिक राशि', en: 'Scorpio', lord: 'मंगल', element: 'जल' },
  { slug: 'dhanu', hi: 'धनु राशि', en: 'Sagittarius', lord: 'बृहस्पति', element: 'अग्नि' },
  { slug: 'makara', hi: 'मकर राशि', en: 'Capricorn', lord: 'शनि', element: 'पृथ्वी' },
  { slug: 'kumbha', hi: 'कुंभ राशि', en: 'Aquarius', lord: 'शनि', element: 'वायु' },
  { slug: 'meena', hi: 'मीन राशि', en: 'Pisces', lord: 'बृहस्पति', element: 'जल' }
];

// 5. 16 Choghadiyas
const CHOGHADIYAS = [
  { slug: 'shubh-choghadiya', hi: 'शुभ चौघड़िया', nature: 'अति शुभ', planet: 'बृहस्पति', desc: 'विवाह, धर्म, विद्या एवं मांगलिक कार्य हेतु सर्वोत्तम' },
  { slug: 'amrit-choghadiya', hi: 'अमृत चौघड़िया', nature: 'सर्वोत्तम', planet: 'चंद्रमा', desc: 'सभी प्रकार के नए कार्य, यात्रा एवं व्यापार हेतु अमृत समान' },
  { slug: 'labh-choghadiya', hi: 'लाभ चौघड़िया', nature: 'लाभप्रद', planet: 'बुध', desc: 'दुकान, व्यापार, धन निवेश एवं लाभ प्राप्ति हेतु उत्तम' },
  { slug: 'char-choghadiya', hi: 'चर चौघड़िया', nature: 'सामान्य शुभ', planet: 'शुक्र', desc: 'यात्रा, वाहन चालन एवं गतिमान कार्यों हेतु उत्तम' },
  { slug: 'rog-choghadiya', hi: 'रोग चौघड़िया', nature: 'अशुभ', planet: 'मंगल', desc: 'शुभ कार्यों में वर्जित, विवाद व व्याधि कारक' },
  { slug: 'kaal-choghadiya', hi: 'काल चौघड़िया', nature: 'अशुभ', planet: 'शनि', desc: 'हानि व संकट कारक, शुभ कार्य सर्वथा त्याज्य' },
  { slug: 'udveg-choghadiya', hi: 'उद्वेग चौघड़िया', nature: 'अशुभ', planet: 'सूर्य', desc: 'मानसिक अशांति एवं तनाव कारक, नए कार्य न करें' },
  { slug: 'choghadiya-chart-today', hi: 'आज का चौघड़िया चक्र', nature: 'दैनिक सारणी', planet: 'नवग्रह', desc: '१६ दिन व रात्रि चौघड़िया का संपूर्ण शास्त्रीय विभाजन' },
  { slug: 'shubh-muhurat-choghadiya', hi: 'चौघड़िया अनुसार शुभ मुहूर्त', nature: 'मुहूर्त चयन', planet: 'बृहस्पति', desc: 'शुभ, लाभ व अमृत कालखंडों का समय' },
  { slug: 'rahu-kaal-vs-choghadiya', hi: 'राहुकाल बनाम चौघड़िया', nature: 'वर्जित काल भेद', planet: 'राहु', desc: 'राहुकाल के दौरान शुभ चौघड़िया का शास्त्रीय परिहार' },
  { slug: 'night-choghadiya-rules', hi: 'रात्रि चौघड़िया नियम', nature: 'रात्रि काल', planet: 'चंद्रमा', desc: 'सूर्यास्त से सूर्योदय तक ८ रात्रि चौघड़िया' },
  { slug: 'day-choghadiya-rules', hi: 'दिन का चौघड़िया नियम', nature: 'दिनमान काल', planet: 'सूर्य', desc: 'सूर्योदय से सूर्यास्त तक ८ दिन के चौघड़िया' },
  { slug: 'amrit-muhurat-timing', hi: 'अमृत मुहूर्त समय', nature: 'अमृत काल', planet: 'चंद्रमा', desc: 'दैनिक अमृत चौघड़िया का सटीक स्थानीय समय' },
  { slug: 'shubh-timing-today', hi: 'आज का शुभ समय', nature: 'शुभ काल', planet: 'गुरु', desc: 'शुभ चौघड़िया व अभिजित मुहूर्त का संगम' },
  { slug: 'labh-timing-today', hi: 'आज का लाभ समय', nature: 'लाभ काल', planet: 'बुध', desc: 'व्यापारिक लाभ चौघड़िया का समय' },
  { slug: 'char-timing-today', hi: 'आज का चर समय', nature: 'चर काल', planet: 'शुक्र', desc: 'यात्रा व प्रस्थान हेतु चर चौघड़िया' }
];

// 6. 24 Planetary Horas
const HORAS = [
  { slug: 'surya-hora', hi: 'सूर्य होरा', lord: 'सूर्य', nature: 'शुभ', desc: 'राजकीय कार्य, पदभार ग्रहण, स्वर्ण क्रय व उच्चाधिकारियों से भेंट' },
  { slug: 'chandra-hora', hi: 'चंद्र होरा', lord: 'चंद्रमा', nature: 'अति शुभ', desc: 'नवीन कार्य, जल संबंधी कार्य, यात्रा, आभूषण व शांति कर्म' },
  { slug: 'mangal-hora', hi: 'मंगल होरा', lord: 'मंगल', nature: 'उग्र', desc: 'भूमि क्रय, न्यायालय, साहस, सैन्य कार्य एवं खेलकूद' },
  { slug: 'budha-hora', hi: 'बुध होरा', lord: 'बुध', nature: 'अति शुभ', desc: 'व्यापार, लेखन, अध्ययन, बहीखाता, शेयर व समझौता' },
  { slug: 'guru-hora', hi: 'गुरु होरा', lord: 'बृहस्पति', nature: 'सर्वोत्तम', desc: 'विवाह, यज्ञ, विद्यारंभ, बैंक, धर्म व ज्ञान प्राप्ति' },
  { slug: 'shukra-hora', hi: 'शुक्र होरा', lord: 'शुक्र', nature: 'अति शुभ', desc: 'विवाह चर्चा, वस्त्र क्रय, संगीत, कला व सौंदर्य प्रसाधन' },
  { slug: 'shani-hora', hi: 'शनि होरा', lord: 'शनि', nature: 'स्थिर / उग्र', desc: 'लोहा, तेल, वाहन क्रय, गृह प्रवेश की नींव व सेवा कार्य' },
  { slug: 'hora-calculation-formula', hi: 'होरा चक्र गणना सूत्र', lord: 'काल पुरुष', nature: 'शास्त्रीय', desc: 'सूर्योदय से अहोरात्र २४ ग्रहीय कालखंड विभाजन' },
  { slug: 'aaj-ki-shubh-hora', hi: 'आज की शुभ होरा', lord: 'गुरु व शुक्र', nature: 'शुभ काल', desc: 'दिनभर में अमृतदायी गुरु, शुक्र व बुध होरा का समय' },
  { slug: 'hora-chart-table', hi: '२४ होरा चक्र सारणी', lord: 'सप्त ग्रह', nature: 'सारणी', desc: 'सातों वारों की २४-२४ होरा का संपूर्ण वैदिक चार्ट' },
  { slug: 'ravivar-hora', hi: 'रविवार की होरा', lord: 'सूर्य', nature: 'दैनिक', desc: 'रविवार सूर्योदय से प्रारंभ होने वाली २४ होरा' },
  { slug: 'somvar-hora', hi: 'सोमवार की होरा', lord: 'चंद्रमा', nature: 'दैनिक', desc: 'सोमवार सूर्योदय से प्रारंभ होने वाली २४ होरा' },
  { slug: 'mangalvar-hora', hi: 'मंगलवार की होरा', lord: 'मंगल', nature: 'दैनिक', desc: 'मंगलवार सूर्योदय से प्रारंभ होने वाली २४ होरा' },
  { slug: 'budhvar-hora', hi: 'बुधवार की होरा', lord: 'बुध', nature: 'दैनिक', desc: 'बुधवार सूर्योदय से प्रारंभ होने वाली २४ होरा' },
  { slug: 'guruvar-hora', hi: 'गुरुवार की होरा', lord: 'बृहस्पति', nature: 'दैनिक', desc: 'गुरुवार सूर्योदय से प्रारंभ होने वाली २४ होरा' },
  { slug: 'shukravar-hora', hi: 'शुक्रवार की होरा', lord: 'शुक्र', nature: 'दैनिक', desc: 'शुक्रवार सूर्योदय से प्रारंभ होने वाली २४ होरा' },
  { slug: 'shanivar-hora', hi: 'शनिवार की होरा', lord: 'शनि', nature: 'दैनिक', desc: 'शनिवार सूर्योदय से प्रारंभ होने वाली २४ होरा' },
  { slug: 'vivah-shubh-hora', hi: 'विवाह हेतु शुभ होरा', lord: 'गुरु / शुक्र', nature: 'विवाह', desc: 'विवाह लग्न में गुरु एवं शुक्र होरा का महत्व' },
  { slug: 'vyapar-shubh-hora', hi: 'व्यापार हेतु शुभ होरा', lord: 'बुध / गुरु', nature: 'व्यापार', desc: 'दुकान प्रतिष्ठान मुहूर्त हेतु बुध होरा' },
  { slug: 'graha-pravesh-hora', hi: 'गृह प्रवेश शुभ होरा', lord: 'गुरु / चंद्र', nature: 'गृह प्रवेश', desc: 'नूतन गृह प्रवेश में शुभ होरा विचार' },
  { slug: 'vahan-kharidne-ki-hora', hi: 'वाहन क्रय शुभ होरा', lord: 'शुक्र / शनि', nature: 'वाहन', desc: 'वाहन क्रय में शुक्र व चर होरा का समय' },
  { slug: 'sampatti-shubh-hora', hi: 'भूमि संपत्ति शुभ होरा', lord: 'मंगल / गुरु', nature: 'भूमि', desc: 'भूमि रजिस्ट्री व पूजन हेतु शुभ होरा' },
  { slug: 'swasthya-aushadhi-hora', hi: 'औषधि सेवन शुभ होरा', lord: 'सूर्य / चंद्र', nature: 'आरोग्य', desc: 'रोग निवारण व औषधि प्रारंभ करने की होरा' },
  { slug: 'ratna-dharan-hora', hi: 'रत्न धारण शुभ होरा', lord: 'संबंधित ग्रह', nature: 'रत्न', desc: 'अंगूठी व रत्न प्राण प्रतिष्ठा हेतु ग्रहीय होरा' }
];

// 7. 15 Regional Calendars
const CALENDARS = [
  { slug: 'hindu-calendar-2025', hi: 'हिन्दू कैलेंडर २०२५ (विक्रम संवत २०८१-२०८२)' },
  { slug: 'hindu-calendar-2026', hi: 'हिन्दू कैलेंडर २०२६ (विक्रम संवत २०८२-२०८३)' },
  { slug: 'hindu-calendar-2027', hi: 'हिन्दू कैलेंडर २०२७ (विक्रम संवत २०८३-२०८४)' },
  { slug: 'vikram-samvat-2081', hi: 'विक्रम संवत २०८१ संपूर्ण पंचांग व व्रत' },
  { slug: 'vikram-samvat-2082', hi: 'विक्रम संवत २०८२ संपूर्ण पंचांग व व्रत' },
  { slug: 'gujarati-calendar', hi: 'गुजराती पंचांग एवं कैलेंडर (विक्रम संवत कार्तिगादी)' },
  { slug: 'marathi-calendar', hi: 'मराठी पंचांग एवं दिनदर्शिका (शालिवाहन शक)' },
  { slug: 'bengali-panjika', hi: 'बंगाली पंजिका (बांग्ला संवत १४३२)' },
  { slug: 'tamil-panchangam', hi: 'तमिल पंचांगम (सौर वर्ष क्रोधी)' },
  { slug: 'malayalam-calendar', hi: 'मलयालम कोल्लम कैलेंडर (कोल्लवर्षम्)' },
  { slug: 'odia-panji', hi: 'ओडिया कोहिनूर पंजिका (ओड़िशा संवत)' },
  { slug: 'telugu-panchangam', hi: 'तेलुगु पंचांगमु (चांद्रमान युग)' },
  { slug: 'kannada-panchanga', hi: 'कन्नड़ पंचांग (कन्नड़ संवत्सर)' },
  { slug: 'iskcon-calendar', hi: 'इस्कॉन वैष्णव कैलेंडर (गौर पूर्णिमा व एकादशी)' },
  { slug: 'a4-wall-calendar', hi: 'सनातन A4 वॉल कैलेंडर (प्रिंट एवं पीडीएफ)' }
];

// 8. 10 Astrological Tools
const TOOLS = [
  { slug: 'kundli-milan-36-guna', hi: '३६ गुण कुण्डली मिलान (अष्टकूट मेलापक)' },
  { slug: 'sade-sati-calculator', hi: 'शनि साढ़े साती एवं ढैया गणक' },
  { slug: 'ratna-rudraksha-paramarsh', hi: 'लग्न अनुसार व्यक्तिगत रत्न व रुद्राक्ष परामर्श' },
  { slug: 'vedic-kaalganana-converter', hi: 'वैदिक कालगणना कनवर्टर (त्रुटि से कल्प)' },
  { slug: 'vastu-compass-ashtadisha', hi: 'वास्तु कंपास एवं अष्टदिशा ऊर्जा' },
  { slug: 'a4-janampatrika-download', hi: 'पारंपरिक A4 पंडित जन्मपत्रिका डाउनलोड' },
  { slug: 'a4-vivah-certificate-download', hi: 'पारंपरिक A4 विवाह मिलान प्रमाण पत्र' },
  { slug: 'bhav-chalit-sripati', hi: 'श्रीपति भाव चलित चक्र विश्लेषक' },
  { slug: 'sarvashtakavarga-337-matrix', hi: 'सर्वाष्टकवर्ग ३३७ बिंदु इनवेरिएंट चक्र' },
  { slug: 'vimshottari-120-year-dasha', hi: '१२० वर्षीय विंशोत्तरी महादशा-अंतर्दशा' }
];

/**
 * Read base Vite index.html to extract CSS and JS asset paths
 */
function getBaseAssetTags() {
  const indexHtmlPath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('ERROR: dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }
  const content = fs.readFileSync(indexHtmlPath, 'utf8');

  // Extract <script type="module" crossorigin src="/assets/index-....js"></script>
  const jsMatch = content.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/i);
  // Extract <link rel="stylesheet" crossorigin href="/assets/index-....css">
  const cssMatch = content.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/i);

  return {
    jsTag: jsMatch ? jsMatch[0] : '<script type="module" src="/src/main.tsx"></script>',
    cssTag: cssMatch ? cssMatch[0] : '',
    jsSrc: jsMatch ? jsMatch[1] : '/src/main.tsx',
    cssHref: cssMatch ? cssMatch[1] : '/src/index.css'
  };
}

/**
 * Generate a pre-rendered static HTML shell
 */
function renderStaticHtml({ title, description, canonicalUrl, keywords, h1, category, breadcrumbs, jsonLd, contentHtml, clientRoute, assetTags }) {
  return `<!doctype html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ea580c" />
    <link rel="icon" type="image/png" href="/App1.png" />
    <link rel="apple-touch-icon" href="/app_icon_512x512.png" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords.join(', ')}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- OpenGraph & Social Cards -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Sanatan Ghadi Vedic (सनातन घड़ी वैदिक)" />
    <meta property="og:image" content="${SITE_URL}/images/og-panchang-banner.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${SITE_URL}/images/og-panchang-banner.png" />

    <!-- Typography Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Schema.org Structured Microdata (JSON-LD) -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>

    <!-- Production Assets -->
    ${assetTags.cssTag}
    ${assetTags.jsTag}

    <!-- Client Hydration Route Anchor -->
    <script>
      window.__PRE_RENDERED_ROUTE__ = "${clientRoute}";
    </script>
  </head>
  <body class="bg-[#faf7f2] text-[#26150b] font-serif antialiased selection:bg-[#ea580c] selection:text-white">
    <!-- Static Pre-Rendered Semantic Container for Search Engine Crawlers & Immediate FCP -->
    <div id="root">
      <div class="min-h-screen flex flex-col justify-between">
        <header class="w-full bg-[#26160e] text-[#f7f2e6] border-b-2 border-[#b8860b] py-4 px-6 sm:px-12">
          <div class="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" class="flex items-center gap-3 text-amber-400 no-underline font-bold text-xl">
              <span>🕉️</span> <span>सनातन घड़ी</span>
            </a>
            <div class="text-xs text-amber-200/80 font-sans hidden sm:block">
              आधुनिक वैदिक पंचांग, चौघड़िया, जन्म कुंडली एवं कालगणना
            </div>
          </div>
        </header>

        <main class="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 space-y-6">
          <!-- Breadcrumb Navigation -->
          <nav aria-label="Breadcrumb" class="text-xs sm:text-sm text-stone-600 font-sans flex items-center gap-2">
            <a href="/" class="hover:text-amber-800">मुख्य पृष्ठ</a>
            <span>›</span>
            <span>${category}</span>
            <span>›</span>
            <span class="text-amber-900 font-semibold">${h1}</span>
          </nav>

          <!-- Pre-Rendered Sacred Card -->
          <article class="bg-white/90 rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-4">
            <div class="text-xs font-sans font-semibold text-amber-800 tracking-wider uppercase">
              ${category} • सनातन कालगणना
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold text-[#26150b] leading-tight">
              ${h1}
            </h1>
            <p class="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
              ${description}
            </p>
            ${contentHtml}
            <div class="pt-4 border-t border-amber-900/10 flex flex-wrap gap-3">
              <a href="${clientRoute}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-sans text-sm font-semibold shadow-xs transition-colors no-underline">
                <span>🔄 लाइव गणना एवं पूर्ण विवरण देखें</span>
              </a>
              <a href="/" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-sans text-sm font-medium transition-colors no-underline">
                <span>मुख्य पंचांग पोर्टल</span>
              </a>
            </div>
          </article>
        </main>

        <footer class="w-full bg-[#26160e] text-[#f7f2e6] border-t-2 border-[#b8860b] py-6 px-6 text-center text-xs space-y-2">
          <div>© २०२६ सनातन घड़ी वैदिक (Sanatan Ghadi Vedic) • NASA JPL DE405 एवं चित्रपक्षीय लाहिड़ी अयनांश मानक</div>
          <div class="text-stone-400">१००% विज्ञापन-मुक्त • १००% ऑफ़लाइन PWA • पूर्ण डेटा संप्रभुता</div>
        </footer>
      </div>
    </div>
  </body>
</html>`;
}

/**
 * Main Generator Execution
 */
export function runProgrammaticSeoGenerator() {
  const startTime = Date.now();
  console.log('🚀 Starting Zero-Conflict Programmatic SEO Generator...');

  const assetTags = getBaseAssetTags();
  const sitemapUrls = [];
  let generatedCount = 0;

  // Add primary 13 hubs to sitemap
  const primaryHubs = [
    { url: '/', priority: '1.0', changefreq: 'always' },
    { url: '/panchang', priority: '0.9', changefreq: 'always' },
    { url: '/choghadiya', priority: '0.9', changefreq: 'always' },
    { url: '/hora', priority: '0.8', changefreq: 'hourly' },
    { url: '/muhurat', priority: '0.9', changefreq: 'daily' },
    { url: '/kundli', priority: '0.9', changefreq: 'daily' },
    { url: '/calendar', priority: '0.9', changefreq: 'daily' },
    { url: '/matchmaking', priority: '0.8', changefreq: 'weekly' },
    { url: '/utilities', priority: '0.8', changefreq: 'weekly' },
    { url: '/settings', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
    { url: '/terms', priority: '0.5', changefreq: 'monthly' },
    { url: '/about-us', priority: '0.6', changefreq: 'monthly' }
  ];

  for (const hub of primaryHubs) {
    sitemapUrls.push(hub);
  }

  const helperWritePage = (subPath, htmlContent) => {
    const fullDirPath = path.resolve(distDir, subPath);
    fs.mkdirSync(fullDirPath, { recursive: true });
    fs.writeFileSync(path.resolve(fullDirPath, 'index.html'), htmlContent, 'utf8');
    generatedCount++;
  };

  // -------------------------------------------------------------
  // 1. 100 Cities Panchang (dist/panchang/[city]/index.html)
  // -------------------------------------------------------------
  for (const city of CITIES) {
    const canonical = `${SITE_URL}/panchang/${city.slug}`;
    const title = `दैनिक पंचांग ${city.hi} (Panchang ${city.slug}) | आज की तिथि, मुहूर्त, सूर्योदय | सनातन घड़ी`;
    const description = `${city.hi} (${city.state}) का आज का सटीक वैदिक पंचांग। तिथि, वार, नक्षत्र, योग, करण, राहुकाल, अभिजीत मुहूर्त, और स्थानीय सूर्योदय-सूर्यास्त का प्रामाणिक समय।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: `${city.hi} Panchang`,
      description,
      url: canonical,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.hi,
        addressRegion: city.state,
        addressCountry: 'IN'
      }
    };
    const contentHtml = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans pt-2">
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">स्थान / नगर:</span>
          <span class="font-bold text-stone-900">${city.hi}</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">राज्य / क्षेत्र:</span>
          <span class="font-bold text-stone-900">${city.state}</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">गणना मानक:</span>
          <span class="font-bold text-stone-900">लाहिड़ी अयनांश (Drik)</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">सूर्य क्षितिज:</span>
          <span class="font-bold text-stone-900">Upper Limb + 34' Refraction</span>
        </div>
      </div>
    `;

    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: ['पंचांग', city.hi, `${city.slug} panchang`, 'आज की तिथि', 'राहुकाल', 'शुभ मुहूर्त', 'सूर्योदय'],
      h1: `दैनिक पंचांग — ${city.hi}`,
      category: 'दैनिक पंचांग',
      jsonLd,
      contentHtml,
      clientRoute: `/panchang?city=${city.slug}`,
      assetTags
    });

    helperWritePage(`panchang/${city.slug}`, html);
    sitemapUrls.push({ url: `/panchang/${city.slug}`, priority: '0.8', changefreq: 'daily' });
  }

  // -------------------------------------------------------------
  // 2. 100 Cities Choghadiya (dist/choghadiya/[city]/index.html)
  // -------------------------------------------------------------
  for (const city of CITIES) {
    const canonical = `${SITE_URL}/choghadiya/${city.slug}`;
    const title = `आज का चौघड़िया ${city.hi} | दिन व रात्रि चौघड़िया मुहूर्त | सनातन घड़ी`;
    const description = `${city.hi} का आज का दिन और रात्रि चौघड़िया। अमृत, शुभ, लाभ, चर, रोग, काल एवं उद्वेग मुहूर्त का स्थानीय सूर्योदय-सूर्यास्त आधारित सटीक विभाजन।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Choghadiya ${city.hi}`,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-sans leading-relaxed">
        <strong>${city.hi}</strong> के स्थानीय सूर्योदय व सूर्यास्त के अनुसार दिनमान एवं रात्रिमान के १६-१६ चौघड़िया कालखंडों की लाइव गणना। अमृत, शुभ व लाभ चौघड़िया में नया कार्य आरंभ करना श्रेष्ठ है।
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: ['चौघड़िया', city.hi, 'शुभ चौघड़िया', 'अमृत चौघड़िया', 'आज का चौघड़िया समय'],
      h1: `आज का चौघड़िया — ${city.hi}`,
      category: 'चौघड़िया मुहूर्त',
      jsonLd,
      contentHtml,
      clientRoute: `/choghadiya?city=${city.slug}`,
      assetTags
    });

    helperWritePage(`choghadiya/${city.slug}`, html);
    sitemapUrls.push({ url: `/choghadiya/${city.slug}`, priority: '0.7', changefreq: 'daily' });
  }

  // -------------------------------------------------------------
  // 3. 100 Cities Shubh Muhurat (dist/muhurat/[city]/index.html)
  // -------------------------------------------------------------
  for (const city of CITIES) {
    const canonical = `${SITE_URL}/muhurat/${city.slug}`;
    const title = `शुभ मुहूर्त ${city.hi} | विवाह, गृह प्रवेश, वाहन क्रय मुहूर्त | सनातन घड़ी`;
    const description = `${city.hi} में आज के सभी शुभ मुहूर्त। अभिजित, विजय, गोधूलि, ब्रह्म मुहूर्त, विवाह, गृह प्रवेश, और राहुकाल-पंचक-भद्रा से बचाव का समय।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Shubh Muhurat ${city.hi}`,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs font-sans leading-relaxed">
        <strong>${city.hi}</strong> के लिए ८ प्रमुख वैदिक संस्कारों (विवाह, गृह प्रवेश, व्यापार, वाहन) एवं ४ दैनिक तत्कालिक मुहूर्तों (अभिजित, ब्रह्म, विजय, गोधूलि) की शास्त्रीय सारणी।
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: ['शुभ मुहूर्त', city.hi, 'विवाह मुहूर्त', 'गृह प्रवेश', 'अभिजित मुहूर्त'],
      h1: `शुभ मुहूर्त राडार — ${city.hi}`,
      category: 'शुभ मुहूर्त',
      jsonLd,
      contentHtml,
      clientRoute: `/muhurat?city=${city.slug}`,
      assetTags
    });

    helperWritePage(`muhurat/${city.slug}`, html);
    sitemapUrls.push({ url: `/muhurat/${city.slug}`, priority: '0.7', changefreq: 'daily' });
  }

  // -------------------------------------------------------------
  // 4. 55 Major Festivals (dist/festival/[slug]/index.html)
  // -------------------------------------------------------------
  for (const fest of FESTIVALS) {
    const canonical = `${SITE_URL}/festival/${fest.slug}`;
    const title = `${fest.hi} २०२६ तिथि, शुभ मुहूर्त एवं पूजा विधि | सनातन घड़ी`;
    const description = `${fest.hi} की सटीक खगोलीय तिथि, पूजा का शुभ मुहूर्त, व्रत कथा, और धार्मिक महत्व। आराध्य: ${fest.deity}। ${fest.desc}।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: fest.hi,
      description: fest.desc,
      url: canonical,
      startDate: '2026-01-01',
      eventStatus: 'https://schema.org/EventScheduled'
    };
    const contentHtml = `
      <div class="space-y-3 font-sans text-xs">
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="font-bold text-amber-900">आराध्य देव / देवी:</span> ${fest.deity}
        </div>
        <p class="text-stone-700 leading-relaxed">
          ${fest.desc}। सनातन घड़ी का खगोलीय इंजन धर्म सिंधु एवं निर्णय सिंधु के अनुसार स्थानीय सूर्योदय व तिथि संयोग की सूक्ष्म गणना करता है।
        </p>
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [fest.hi, `${fest.slug} 2026`, 'त्योहार', 'पूजा मुहूर्त', 'व्रत विधि'],
      h1: fest.hi,
      category: 'सनातन व्रत एवं त्योहार',
      jsonLd,
      contentHtml,
      clientRoute: `/calendar?festival=${fest.slug}`,
      assetTags
    });

    helperWritePage(`festival/${fest.slug}`, html);
    sitemapUrls.push({ url: `/festival/${fest.slug}`, priority: '0.8', changefreq: 'weekly' });
  }

  // -------------------------------------------------------------
  // 5. 55 Vrats & Parana Rules (dist/vrat/[slug]/index.html)
  // -------------------------------------------------------------
  for (const fest of FESTIVALS) {
    const canonical = `${SITE_URL}/vrat/${fest.slug}`;
    const title = `${fest.hi} व्रत पारण समय एवं हरि वासर नियम | सनातन घड़ी`;
    const description = `${fest.hi} का शास्त्रोक्त पारण समय, हरि वासर समाप्ति, स्मार्त व वैष्णव व्रत भेद, एवं पारण महामंत्र।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${fest.hi} Vrat Parana Rules`,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-sans leading-relaxed">
        एकादशी एवं प्रमुख व्रतों में पारण का विशेष महत्व है। द्वादशी तिथि समाप्त होने से पूर्व एवं हरि वासर (द्वादशी का प्रथम २५% भाग) समाप्त होने के उपरांत ही पारण शास्त्रसम्मत माना जाता है।
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [fest.hi, 'पारण समय', 'हरि वासर', 'स्मार्त वैष्णव', 'व्रत नियम'],
      h1: `${fest.hi} — व्रत पारण एवं नियम`,
      category: 'व्रत पारण सारणी',
      jsonLd,
      contentHtml,
      clientRoute: `/calendar?vrat=${fest.slug}`,
      assetTags
    });

    helperWritePage(`vrat/${fest.slug}`, html);
    sitemapUrls.push({ url: `/vrat/${fest.slug}`, priority: '0.7', changefreq: 'weekly' });
  }

  // -------------------------------------------------------------
  // 6. 27 Nakshatras (dist/nakshatra/[slug]/index.html)
  // -------------------------------------------------------------
  for (const nak of NAKSHATRAS) {
    const canonical = `${SITE_URL}/nakshatra/${nak.slug}`;
    const title = `${nak.hi} नक्षत्र फल, स्वामी ग्रह एवं स्वभाव | सनातन घड़ी`;
    const description = `२७ नक्षत्रों में ${nak.hi} नक्षत्र का फल, नक्षत्र स्वामी: ${nak.lord}, आराध्य देवता: ${nak.deity}। ४ पाद, चरण अक्षर, स्वभाव और शुभ कार्य।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${nak.hi} Nakshatra`,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="grid grid-cols-2 gap-3 text-xs font-sans pt-1">
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">नक्षत्र स्वामी ग्रह:</span>
          <span class="font-bold text-amber-900">${nak.lord}</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">आराध्य देवता:</span>
          <span class="font-bold text-amber-900">${nak.deity}</span>
        </div>
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [nak.hi, `${nak.slug} nakshatra`, 'नक्षत्र स्वामी', 'पाद अक्षर', 'वैदिक ज्योतिष'],
      h1: `${nak.hi} नक्षत्र संपूर्ण विचार`,
      category: '२७ वैदिक नक्षत्र',
      jsonLd,
      contentHtml,
      clientRoute: `/utilities?nakshatra=${nak.slug}`,
      assetTags
    });

    helperWritePage(`nakshatra/${nak.slug}`, html);
    sitemapUrls.push({ url: `/nakshatra/${nak.slug}`, priority: '0.7', changefreq: 'monthly' });
  }

  // -------------------------------------------------------------
  // 7. 12 Rashis (dist/rashi/[slug]/index.html)
  // -------------------------------------------------------------
  for (const rashi of RASHIS) {
    const canonical = `${SITE_URL}/rashi/${rashi.slug}`;
    const title = `${rashi.hi} (${rashi.en}) स्वभाव, स्वामी ग्रह व भाग्य रत्न | सनातन घड़ी`;
    const description = `१२ राशियों में ${rashi.hi} (${rashi.en}) का संपूर्ण ज्योतिषीय विवरण। राशि स्वामी: ${rashi.lord}, तत्व: ${rashi.element}। स्वभाव, अनुकूल रत्न, और ग्रह स्थिति।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${rashi.hi} (${rashi.en})`,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="grid grid-cols-3 gap-3 text-xs font-sans pt-1">
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">अंग्रेज़ी नाम:</span>
          <span class="font-bold text-stone-900">${rashi.en}</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">राशि स्वामी:</span>
          <span class="font-bold text-amber-900">${rashi.lord}</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span class="block text-stone-500 font-semibold">राशि तत्व:</span>
          <span class="font-bold text-amber-900">${rashi.element}</span>
        </div>
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [rashi.hi, rashi.en, `${rashi.slug} rashi`, 'राशि स्वामी', 'राशि स्वभाव'],
      h1: `${rashi.hi} (${rashi.en}) — राशि परिचय`,
      category: '१२ राशियां',
      jsonLd,
      contentHtml,
      clientRoute: `/kundli?rashi=${rashi.slug}`,
      assetTags
    });

    helperWritePage(`rashi/${rashi.slug}`, html);
    sitemapUrls.push({ url: `/rashi/${rashi.slug}`, priority: '0.7', changefreq: 'monthly' });
  }

  // -------------------------------------------------------------
  // 8. 16 Choghadiyas (dist/choghadiya-timing/[slug]/index.html)
  // -------------------------------------------------------------
  for (const ch of CHOGHADIYAS) {
    const canonical = `${SITE_URL}/choghadiya-timing/${ch.slug}`;
    const title = `${ch.hi} क्या होता है? मुहूर्त, प्रकृति एवं प्रभाव | सनातन घड़ी`;
    const description = `${ch.hi} का शास्त्रीय अर्थ, प्रकृति: ${ch.nature}, अधिपति ग्रह: ${ch.planet}। ${ch.desc}।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: ch.hi,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-sans leading-relaxed space-y-2">
        <div><strong>चौघड़िया प्रकृति:</strong> ${ch.nature} | <strong>अधिपति ग्रह:</strong> ${ch.planet}</div>
        <p>${ch.desc}। चौघड़िया में यात्रा व मांगलिक कार्यों का विशेष विचार किया जाता है।</p>
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [ch.hi, ch.slug, 'चौघड़िया मुहूर्त', 'शुभ समय', 'वैदिक ज्योतिष'],
      h1: ch.hi,
      category: 'चौघड़िया विचार',
      jsonLd,
      contentHtml,
      clientRoute: `/choghadiya`,
      assetTags
    });

    helperWritePage(`choghadiya-timing/${ch.slug}`, html);
    sitemapUrls.push({ url: `/choghadiya-timing/${ch.slug}`, priority: '0.6', changefreq: 'monthly' });
  }

  // -------------------------------------------------------------
  // 9. 24 Planetary Horas (dist/hora-timing/[slug]/index.html)
  // -------------------------------------------------------------
  for (const h of HORAS) {
    const canonical = `${SITE_URL}/hora-timing/${h.slug}`;
    const title = `${h.hi} में क्या करें और क्या न करें | सनातन घड़ी`;
    const description = `${h.hi} का समय, स्वामी ग्रह: ${h.lord}, प्रकृति: ${h.nature}। ${h.desc}।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: h.hi,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-sans leading-relaxed space-y-2">
        <div><strong>होरा स्वामी ग्रह:</strong> ${h.lord} | <strong>प्रकृति:</strong> ${h.nature}</div>
        <p>${h.desc}। अहोरात्र के २४ कालखंडों में होरा का सूक्ष्म प्रभाव रहता है।</p>
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [h.hi, h.slug, 'होरा चक्र', 'ग्रह होरा', 'दैनिक मुहूर्त'],
      h1: h.hi,
      category: '२४ ग्रहीय होरा',
      jsonLd,
      contentHtml,
      clientRoute: `/hora`,
      assetTags
    });

    helperWritePage(`hora-timing/${h.slug}`, html);
    sitemapUrls.push({ url: `/hora-timing/${h.slug}`, priority: '0.6', changefreq: 'monthly' });
  }

  // -------------------------------------------------------------
  // 10. 15 Regional Calendars (dist/calendar/[slug]/index.html)
  // -------------------------------------------------------------
  for (const cal of CALENDARS) {
    const canonical = `${SITE_URL}/calendar/${cal.slug}`;
    const title = `${cal.hi} | पर्व, त्योहार एवं मासिक तिथियां | सनातन घड़ी`;
    const description = `${cal.hi} का मासिक कैलेंडर, सभी एकादशी, पूर्णिमा, अमावस्या, प्रदोष, एवं सनातन त्योहारों की सटीक गणना।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: cal.hi,
      description,
      url: canonical
    };
    const contentHtml = `
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-sans leading-relaxed">
        ${cal.hi} — सम्पूर्ण १२ मासों के व्रत एवं त्योहारों की खगोलीय गणना। A4 वॉल कैलेंडर लेआउट में प्रिंट व पीडीएफ हेतु उपलब्ध।
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [cal.hi, cal.slug, 'हिन्दू कैलेंडर', 'पंचांग कैलेंडर', 'मासिक व्रत'],
      h1: cal.hi,
      category: 'क्षेत्रीय पंचांग व कैलेंडर',
      jsonLd,
      contentHtml,
      clientRoute: `/calendar`,
      assetTags
    });

    helperWritePage(`calendar/${cal.slug}`, html);
    sitemapUrls.push({ url: `/calendar/${cal.slug}`, priority: '0.7', changefreq: 'monthly' });
  }

  // -------------------------------------------------------------
  // 11. 10 Astrological Tools (dist/tools/[slug]/index.html)
  // -------------------------------------------------------------
  for (const tool of TOOLS) {
    const canonical = `${SITE_URL}/tools/${tool.slug}`;
    const title = `${tool.hi} ऑनलाइन फ्री गणक | सनातन घड़ी`;
    const description = `${tool.hi}। महर्षि पराशर एवं वैदिक खगोल विज्ञान सिद्धांतों पर आधारित निःशुल्क, विज्ञापन-मुक्त व सटीक कैलकुलेटर।`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.hi,
      description,
      url: canonical,
      applicationCategory: 'AstrologyApplication',
      operatingSystem: 'All'
    };
    const contentHtml = `
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-sans leading-relaxed">
        ${tool.hi} का संपूर्ण एल्गोरिदम शुद्ध गणितीय रूप से प्रमाणित है। zero-lag क्लाइंट साइड निष्पादन और १-क्लिक डाउनलोड सुविधा।
      </div>
    `;
    const html = renderStaticHtml({
      title,
      description,
      canonicalUrl: canonical,
      keywords: [tool.hi, tool.slug, 'वैदिक टूल्स', 'कुंडली मिलान', 'साढ़े साती गणक'],
      h1: tool.hi,
      category: 'वैदिक ज्योतिषीय उपकरण',
      jsonLd,
      contentHtml,
      clientRoute: `/utilities`,
      assetTags
    });

    helperWritePage(`tools/${tool.slug}`, html);
    sitemapUrls.push({ url: `/tools/${tool.slug}`, priority: '0.7', changefreq: 'monthly' });
  }

  // -------------------------------------------------------------
  // 12. Generate sitemap.xml
  // -------------------------------------------------------------
  const now = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    item => `  <url>
    <loc>${SITE_URL}${item.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ ZERO-CONFLICT PROGRAMMATIC SEO GENERATION COMPLETE!`);
  console.log(`📊 Total Pre-rendered Static HTML Pages Generated: ${generatedCount}`);
  console.log(`🗺️  Total Sitemap URLs Indexed: ${sitemapUrls.length}`);
  console.log(`⏱️  Execution Time: ${elapsed}s`);
}

// Direct CLI Execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runProgrammaticSeoGenerator();
}
