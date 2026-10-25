/**
 * Sanatan Web (सनातन घड़ी)
 * Presets: Kundli Milan & 36 Guna Ashtakoot Dictionaries
 * Reference tables for Rashis, Nakshatras, Kootas and Classical Marriage Blessings
 * Strict < 300 lines modular standard
 */

export interface RashiOption {
  index: number; // 0 to 11
  hindi: string;
  english: string;
  lordHindi: string;
  elementHindi: string;
}

export interface NakshatraOption {
  index: number; // 0 to 26
  hindi: string;
  english: string;
  lordHindi: string;
  ganaHindi: string;
  nadiHindi: string;
  yoniHindi: string;
}

export const RASHI_LIST: RashiOption[] = [
  { index: 0, hindi: 'मेष', english: 'Aries', lordHindi: 'मंगल', elementHindi: 'अग्नि' },
  { index: 1, hindi: 'वृषभ', english: 'Taurus', lordHindi: 'शुक्र', elementHindi: 'पृथ्वी' },
  { index: 2, hindi: 'मिथुन', english: 'Gemini', lordHindi: 'बुध', elementHindi: 'वायु' },
  { index: 3, hindi: 'कर्क', english: 'Cancer', lordHindi: 'चंद्र', elementHindi: 'जल' },
  { index: 4, hindi: 'सिंह', english: 'Leo', lordHindi: 'सूर्य', elementHindi: 'अग्नि' },
  { index: 5, hindi: 'कन्या', english: 'Virgo', lordHindi: 'बुध', elementHindi: 'पृथ्वी' },
  { index: 6, hindi: 'तुला', english: 'Libra', lordHindi: 'शुक्र', elementHindi: 'वायु' },
  { index: 7, hindi: 'वृश्चिक', english: 'Scorpio', lordHindi: 'मंगल', elementHindi: 'जल' },
  { index: 8, hindi: 'धनु', english: 'Sagittarius', lordHindi: 'गुरु', elementHindi: 'अग्नि' },
  { index: 9, hindi: 'मकर', english: 'Capricorn', lordHindi: 'शनि', elementHindi: 'पृथ्वी' },
  { index: 10, hindi: 'कुंभ', english: 'Aquarius', lordHindi: 'शनि', elementHindi: 'वायु' },
  { index: 11, hindi: 'मीन', english: 'Pisces', lordHindi: 'गुरु', elementHindi: 'जल' },
];

export const NAKSHATRA_LIST: NakshatraOption[] = [
  { index: 0, hindi: 'अश्विनी', english: 'Ashwini', lordHindi: 'केतु', ganaHindi: 'देव', nadiHindi: 'आदि', yoniHindi: 'अश्व' },
  { index: 1, hindi: 'भरणी', english: 'Bharani', lordHindi: 'शुक्र', ganaHindi: 'मनुष्य', nadiHindi: 'मध्य', yoniHindi: 'गज' },
  { index: 2, hindi: 'कृत्तिका', english: 'Krittika', lordHindi: 'सूर्य', ganaHindi: 'राक्षस', nadiHindi: 'अंत्य', yoniHindi: 'मेष' },
  { index: 3, hindi: 'रोहिणी', english: 'Rohini', lordHindi: 'चंद्र', ganaHindi: 'मनुष्य', nadiHindi: 'अंत्य', yoniHindi: 'सर्प' },
  { index: 4, hindi: 'मृगशिरा', english: 'Mrigashira', lordHindi: 'मंगल', ganaHindi: 'देव', nadiHindi: 'मध्य', yoniHindi: 'सर्प' },
  { index: 5, hindi: 'आर्द्रा', english: 'Ardra', lordHindi: 'राहु', ganaHindi: 'मनुष्य', nadiHindi: 'आदि', yoniHindi: 'श्वान' },
  { index: 6, hindi: 'पुनर्वसु', english: 'Punarvasu', lordHindi: 'गुरु', ganaHindi: 'देव', nadiHindi: 'आदि', yoniHindi: 'मार्जार' },
  { index: 7, hindi: 'पुष्य', english: 'Pushya', lordHindi: 'शनि', ganaHindi: 'देव', nadiHindi: 'मध्य', yoniHindi: 'मेष' },
  { index: 8, hindi: 'आश्लेषा', english: 'Ashlesha', lordHindi: 'बुध', ganaHindi: 'राक्षस', nadiHindi: 'अंत्य', yoniHindi: 'मार्जार' },
  { index: 9, hindi: 'मघा', english: 'Magha', lordHindi: 'केतु', ganaHindi: 'राक्षस', nadiHindi: 'अंत्य', yoniHindi: 'मूषक' },
  { index: 10, hindi: 'पूर्वाफाल्गुनी', english: 'Purva Phalguni', lordHindi: 'शुक्र', ganaHindi: 'मनुष्य', nadiHindi: 'मध्य', yoniHindi: 'मूषक' },
  { index: 11, hindi: 'उत्तराफाल्गुनी', english: 'Uttara Phalguni', lordHindi: 'सूर्य', ganaHindi: 'मनुष्य', nadiHindi: 'आदि', yoniHindi: 'गौ' },
  { index: 12, hindi: 'हस्त', english: 'Hasta', lordHindi: 'चंद्र', ganaHindi: 'देव', nadiHindi: 'आदि', yoniHindi: 'महिष' },
  { index: 13, hindi: 'चित्रा', english: 'Chitra', lordHindi: 'मंगल', ganaHindi: 'राक्षस', nadiHindi: 'मध्य', yoniHindi: 'व्याघ्र' },
  { index: 14, hindi: 'स्वाति', english: 'Swati', lordHindi: 'राहु', ganaHindi: 'देव', nadiHindi: 'अंत्य', yoniHindi: 'महिष' },
  { index: 15, hindi: 'विशाखा', english: 'Vishakha', lordHindi: 'गुरु', ganaHindi: 'राक्षस', nadiHindi: 'अंत्य', yoniHindi: 'व्याघ्र' },
  { index: 16, hindi: 'अनुराधा', english: 'Anuradha', lordHindi: 'शनि', ganaHindi: 'देव', nadiHindi: 'मध्य', yoniHindi: 'मृग' },
  { index: 17, hindi: 'ज्येष्ठा', english: 'Jyeshtha', lordHindi: 'बुध', ganaHindi: 'राक्षस', nadiHindi: 'आदि', yoniHindi: 'मृग' },
  { index: 18, hindi: 'मूल', english: 'Mula', lordHindi: 'केतु', ganaHindi: 'राक्षस', nadiHindi: 'आदि', yoniHindi: 'श्वान' },
  { index: 19, hindi: 'पूर्वाषाढ़ा', english: 'Purva Ashadha', lordHindi: 'शुक्र', ganaHindi: 'मनुष्य', nadiHindi: 'मध्य', yoniHindi: 'वानर' },
  { index: 20, hindi: 'उत्तराषाढ़ा', english: 'Uttara Ashadha', lordHindi: 'सूर्य', ganaHindi: 'मनुष्य', nadiHindi: 'अंत्य', yoniHindi: 'नकुल' },
  { index: 21, hindi: 'श्रवण', english: 'Shravana', lordHindi: 'चंद्र', ganaHindi: 'देव', nadiHindi: 'अंत्य', yoniHindi: 'वानर' },
  { index: 22, hindi: 'धनिष्ठा', english: 'Dhanishta', lordHindi: 'मंगल', ganaHindi: 'राक्षस', nadiHindi: 'मध्य', yoniHindi: 'सिंह' },
  { index: 23, hindi: 'शतभिषा', english: 'Shatabhisha', lordHindi: 'राहु', ganaHindi: 'राक्षस', nadiHindi: 'आदि', yoniHindi: 'अश्व' },
  { index: 24, hindi: 'पूर्वाभाद्रपद', english: 'Purva Bhadrapada', lordHindi: 'गुरु', ganaHindi: 'मनुष्य', nadiHindi: 'आदि', yoniHindi: 'सिंह' },
  { index: 25, hindi: 'उत्तराभाद्रपद', english: 'Uttara Bhadrapada', lordHindi: 'शनि', ganaHindi: 'मनुष्य', nadiHindi: 'मध्य', yoniHindi: 'गौ' },
  { index: 26, hindi: 'रेवती', english: 'Revati', lordHindi: 'बुध', ganaHindi: 'देव', nadiHindi: 'अंत्य', yoniHindi: 'गज' },
];

export interface KootaMetadata {
  name: string;
  nameEnglish: string;
  maxPoints: number;
  importanceHindi: string;
  sanskritVerse: string;
}

export const KOOTAS_METADATA: Record<string, KootaMetadata> = {
  Varna: {
    name: 'वर्ण कूट',
    nameEnglish: 'Varna',
    maxPoints: 1,
    importanceHindi: 'आध्यात्मिक प्रवृत्ति, कार्यक्षेत्र एवं अहंकार का संतुलन। वर का वर्ण कन्या के वर्ण के समान अथवा उच्च होना उत्तम माना जाता है।',
    sanskritVerse: 'ब्राह्मण क्षत्रियो वैश्यः शूद्रश्चेति क्रमोदितः।',
  },
  Vashya: {
    name: 'वश्य कूट',
    nameEnglish: 'Vashya',
    maxPoints: 2,
    importanceHindi: 'पारस्परिक आकर्षण, वशीकरण क्षमता एवं वैवाहिक समर्पण। चतुष्पद, द्विपद, जलचर आदि वर्गों के आधार पर निर्णय।',
    sanskritVerse: 'वश्यं चाकर्षणं प्रोक्तं दम्पत्योः प्रीतये सदा।',
  },
  Tara: {
    name: 'तारा (दिन) कूट',
    nameEnglish: 'Tara',
    maxPoints: 3,
    importanceHindi: 'भाग्य, आरोग्य एवं परस्पर आयु का पोषण। जन्म नक्षत्र से परस्पर दूरी के आधार पर संपत्, विपत्, क्षेम, प्रत्यरि आदि ९ ताराओं की गणना।',
    sanskritVerse: 'जन्म सम्पद् विपत् क्षेमं प्रत्यरिः साधको वधः।',
  },
  Yoni: {
    name: 'योनि कूट',
    nameEnglish: 'Yoni',
    maxPoints: 4,
    importanceHindi: 'शारीरिक सामंजस्य, काम-सुख एवं जैविक अनुकूलता। १४ पशु योनियों के स्वाभाविक मित्र, सम व शत्रु संबंधों पर आधारित।',
    sanskritVerse: 'योनिरूपा तु सा प्रीतिः कामभावसमन्विता।',
  },
  'Graha Maitri': {
    name: 'ग्रहमैत्री कूट',
    nameEnglish: 'Graha Maitri',
    maxPoints: 5,
    importanceHindi: 'मानसिक सामंजस्य, बौद्धिक मित्रता एवं स्वभाव की अनुकूलता। वर व कन्या के चंद्र राशि स्वामियों के परस्पर नैसर्गिक व तात्कालिक मैत्री संबंध।',
    sanskritVerse: 'राशीशमैत्री सम्प्रीतिर्हृदयैक्यप्रदायिनी।',
  },
  Gana: {
    name: 'गण कूट',
    nameEnglish: 'Gana',
    maxPoints: 6,
    importanceHindi: 'सामाजिक व्यवहार, प्रकृति व चारित्रिक सामंजस्य। देव गण (परोपकारी), मनुष्य गण (व्यावहारिक), व राक्षस गण (तेजस्वी/स्वतंत्र)।',
    sanskritVerse: 'गणैक्यं तु सुखं सौख्यं प्रीतिवर्धनमुत्तमम्।',
  },
  Bhakoot: {
    name: 'भकूट कूट',
    nameEnglish: 'Bhakoot',
    maxPoints: 7,
    importanceHindi: 'पारिवारिक सुख, वंश वृद्धि, स्वास्थ्य एवं आर्थिक समृद्धि। २/१२ (द्विर्द्वादश), ६/८ (षडाष्टक), व ९/५ (नवपंचम) होने पर दोष, किंतु राशि स्वामी एक होने पर परिहार सिद्ध।',
    sanskritVerse: 'भकूटं वंशवृद्धिश्च पुत्रादिसुखदायकम्।',
  },
  Nadi: {
    name: 'नाड़ी कूट',
    nameEnglish: 'Nadi',
    maxPoints: 8,
    importanceHindi: 'आनुवंशिक शुद्धि, रक्त संतुलन व संतान का आरोग्य। आदि (वात), मध्य (पित्त), अंत्य (कफ)। एक नाड़ी होने पर दोष, किंतु भिन्न राशि/नक्षत्र चरण पर परिहार मान्य।',
    sanskritVerse: 'नाडीदोषस्तु सर्वत्र वर्जितो मुनिपुङ्गवैः।',
  },
};

export const VIVAH_BLESSING_MANTRA =
  'गृभ्णामि ते सौभगत्वाय हस्तं मया पत्या जरदष्टिर्यथासः।\nभगो अर्यमा सविता पुरन्धिर्मह्यं त्वादुर्गार्हपत्याय देवाः॥';

export const VIVAH_BLESSING_MEANING =
  'हे कल्याणी! सौभाग्य एवं दीर्घायु की प्राप्ति हेतु मैं तुम्हारा हाथ ग्रहण करता हूँ। भग, अर्यमा, सविता आदि देवों ने गृहस्थ धर्म के पालन हेतु तुम्हें मुझे सौंपा है।';
