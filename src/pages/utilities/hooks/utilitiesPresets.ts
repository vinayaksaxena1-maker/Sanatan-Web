/**
 * Sanatan Web (सनातन घड़ी)
 * Presets: Vedic Utilities Reference Tables & Metadata
 * Data for Cosmic Time Units, Gemstones & Rudraksha, Vastu Directions, and Disha Shool
 * Strict < 300 lines modular standard
 */

// 1. Vedic Cosmic Time Units (Micro to Macro)
export interface VedicTimeUnit {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  ratioInSeconds: number; // Duration in SI seconds
  description: string;
  category: 'micro' | 'daily' | 'macro';
}

export const VEDIC_TIME_UNITS: VedicTimeUnit[] = [
  { id: 'truti', nameHindi: 'त्रुटि', nameEnglish: 'Truti', ratioInSeconds: 0.00003375, description: 'कमल के पत्ते में सुई चुभाने का समय (३३.७५ माइक्रोसेकंड)', category: 'micro' },
  { id: 'vedha', nameHindi: 'वेध', nameEnglish: 'Vedha', ratioInSeconds: 0.003375, description: '१०० त्रुटि = १ वेध (३.३७५ मिलीसेकंड)', category: 'micro' },
  { id: 'lava', nameHindi: 'लव', nameEnglish: 'Lava', ratioInSeconds: 0.010125, description: '३ वेध = १ लव (१०.१२५ मिलीसेकंड)', category: 'micro' },
  { id: 'nimesha', nameHindi: 'निमेष', nameEnglish: 'Nimesha', ratioInSeconds: 0.030375, description: '३ लव = १ निमेष (पलक झपकने का समय)', category: 'micro' },
  { id: 'kashtha', nameHindi: 'काष्ठा', nameEnglish: 'Kashtha', ratioInSeconds: 0.455625, description: '१५ निमेष = १ काष्ठा (लगभग ०.४५ सेकंड)', category: 'micro' },
  { id: 'kala', nameHindi: 'कला', nameEnglish: 'Kala', ratioInSeconds: 13.66875, description: '३० काष्ठा = १ कला (१३.६७ सेकंड)', category: 'micro' },
  { id: 'vighati', nameHindi: 'विघटी (पल)', nameEnglish: 'Vighati / Pala', ratioInSeconds: 24, description: '६० विपल = १ पल / विघटी (२४ सेकंड)', category: 'daily' },
  { id: 'ghati', nameHindi: 'घटी', nameEnglish: 'Ghati', ratioInSeconds: 1440, description: '६० पल = १ घटी (२४ मिनट / १४४० सेकंड)', category: 'daily' },
  { id: 'muhurat', nameHindi: 'मुहूर्त', nameEnglish: 'Muhurat', ratioInSeconds: 2880, description: '२ घटी = १ मुहूर्त (४८ मिनट)', category: 'daily' },
  { id: 'prahar', nameHindi: 'प्रहर (याम)', nameEnglish: 'Prahar', ratioInSeconds: 10800, description: '७.५ घटी = १ प्रहर (३ घंटे / दिन का १/८ भाग)', category: 'daily' },
  { id: 'ahoratra', nameHindi: 'अहोरात्र', nameEnglish: 'Ahoratra', ratioInSeconds: 86400, description: '६० घटी = ८ प्रहर = १ अहोरात्र (२४ घंटे / दिन-रात)', category: 'daily' },
  { id: 'paksha', nameHindi: 'पक्ष', nameEnglish: 'Paksha', ratioInSeconds: 1296000, description: '१५ अहोरात्र = १ पक्ष (शुक्ल या कृष्ण पक्ष)', category: 'macro' },
  { id: 'masa', nameHindi: 'मास', nameEnglish: 'Masa', ratioInSeconds: 2592000, description: '२ पक्ष = १ हिन्दू मास (३० अहोरात्र)', category: 'macro' },
  { id: 'ritu', nameHindi: 'ऋतु', nameEnglish: 'Ritu', ratioInSeconds: 5184000, description: '२ मास = १ ऋतु (वर्ष की ६ ऋतुएं)', category: 'macro' },
  { id: 'ayana', nameHindi: 'अयन', nameEnglish: 'Ayana', ratioInSeconds: 15552000, description: '३ ऋतु = ६ मास = १ अयन (उत्तरायण या दक्षिणायन)', category: 'macro' },
  { id: 'samvatsara', nameHindi: 'संवत्सर (वर्ष)', nameEnglish: 'Samvatsara', ratioInSeconds: 31104000, description: '२ अयन = १ सौर वर्ष (देवताओं का १ दिन-रात)', category: 'macro' },
];

// 2. Lagna-Based Gemstone & Rudraksha Lookup (Parashari Standards)
export interface LagnaRemedyData {
  lagnaIndex: number; // 0 to 11
  lagnaHindi: string;
  lagnaLord: string;
  lifeGem: { nameHindi: string; planet: string; metal: string; finger: string; day: string; mantra: string };
  luckyGem: { nameHindi: string; planet: string; metal: string; finger: string; day: string; mantra: string };
  punyaGem: { nameHindi: string; planet: string; metal: string; finger: string; day: string; mantra: string };
  prohibitedGems: string[];
  rudraksha: { mukhi: string; deity: string; planet: string; benefitHindi: string };
}

export const LAGNA_REMEDIES: LagnaRemedyData[] = [
  {
    lagnaIndex: 0, lagnaHindi: 'मेष', lagnaLord: 'मंगल',
    lifeGem: { nameHindi: 'मूंगा (Red Coral)', planet: 'मंगल', metal: 'तांबा / सोना', finger: 'अनामिका (Ring)', day: 'मंगलवार', mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः' },
    luckyGem: { nameHindi: 'पुखराज (Yellow Sapphire)', planet: 'बृहस्पति', metal: 'सोना / पीतल', finger: 'तर्जनी (Index)', day: 'गुरुवार', mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः' },
    punyaGem: { nameHindi: 'माणिक्य (Ruby)', planet: 'सूर्य', metal: 'सोना / तांबा', finger: 'अनामिका (Ring)', day: 'रविवार', mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः' },
    prohibitedGems: ['पन्ना (Emerald)', 'हीरा (Diamond)', 'नीलम (Blue Sapphire)'],
    rudraksha: { mukhi: '३ मुखी रुद्राक्ष', deity: 'अग्नि देव', planet: 'मंगल', benefitHindi: 'ऊर्जा, आत्मविश्वास एवं रक्त विकार शमन हेतु' },
  },
  {
    lagnaIndex: 1, lagnaHindi: 'वृषभ', lagnaLord: 'शुक्र',
    lifeGem: { nameHindi: 'हीरा / ओपल (Diamond/Opal)', planet: 'शुक्र', metal: 'चांदी / प्लैटिनम', finger: 'मध्यमा / कनिष्ठिका', day: 'शुक्रवार', mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः' },
    luckyGem: { nameHindi: 'नीलम (Blue Sapphire)', planet: 'शनि', metal: 'पंचधातु / चांदी', finger: 'मध्यमा (Middle)', day: 'शनिवार', mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः' },
    punyaGem: { nameHindi: 'पन्ना (Emerald)', planet: 'बुध', metal: 'सोना / कांसा', finger: 'कनिष्ठिका (Little)', day: 'बुधवार', mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः' },
    prohibitedGems: ['माणिक्य (Ruby)', 'मोती (Pearl)', 'पुखराज (Yellow Sapphire)'],
    rudraksha: { mukhi: '६ मुखी रुद्राक्ष', deity: 'कार्तिकेय', planet: 'शुक्र', benefitHindi: 'सौंदर्य, आकर्षण एवं दांपत्य सुख समृद्धि' },
  },
  {
    lagnaIndex: 2, lagnaHindi: 'मिथुन', lagnaLord: 'बुध',
    lifeGem: { nameHindi: 'पन्ना (Emerald)', planet: 'बुध', metal: 'सोना / चांदी', finger: 'कनिष्ठिका (Little)', day: 'बुधवार', mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः' },
    luckyGem: { nameHindi: 'नीलम (Blue Sapphire)', planet: 'शनि', metal: 'पंचधातु', finger: 'मध्यमा (Middle)', day: 'शनिवार', mantra: 'ॐ शं शनैश्चराय नमः' },
    punyaGem: { nameHindi: 'हीरा / ओपल', planet: 'शुक्र', metal: 'चांदी', finger: 'मध्यमा / अनामिका', day: 'शुक्रवार', mantra: 'ॐ शुं शुक्राय नमः' },
    prohibitedGems: ['मूंगा (Red Coral)', 'पुखराज', 'माणिक्य'],
    rudraksha: { mukhi: '४ मुखी रुद्राक्ष', deity: 'ब्रह्मा', planet: 'बुध', benefitHindi: 'बुद्धि, वाणी, तर्क एवं व्यापारिक सफलता' },
  },
  {
    lagnaIndex: 3, lagnaHindi: 'कर्क', lagnaLord: 'चंद्र',
    lifeGem: { nameHindi: 'मोती (Pearl)', planet: 'चंद्र', metal: 'चांदी', finger: 'कनिष्ठिका (Little)', day: 'सोमवार', mantra: 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः' },
    luckyGem: { nameHindi: 'पुखराज (Yellow Sapphire)', planet: 'बृहस्पति', metal: 'सोना', finger: 'तर्जनी (Index)', day: 'गुरुवार', mantra: 'ॐ बृं बृहस्पतये नमः' },
    punyaGem: { nameHindi: 'मूंगा (Red Coral)', planet: 'मंगल', metal: 'तांबा', finger: 'अनामिका (Ring)', day: 'मंगलवार', mantra: 'ॐ भौं भौमाय नमः' },
    prohibitedGems: ['नीलम', 'हीरा', 'पन्ना'],
    rudraksha: { mukhi: '२ मुखी रुद्राक्ष', deity: 'अर्घनारीश्वर', planet: 'चंद्र', benefitHindi: 'मानसिक शांति, भावनात्मक स्थिरता व पारिवारिक सौहार्द' },
  },
  {
    lagnaIndex: 4, lagnaHindi: 'सिंह', lagnaLord: 'सूर्य',
    lifeGem: { nameHindi: 'माणिक्य (Ruby)', planet: 'सूर्य', metal: 'सोना / तांबा', finger: 'अनामिका (Ring)', day: 'रविवार', mantra: 'ॐ सूर्याय नमः' },
    luckyGem: { nameHindi: 'मूंगा (Red Coral)', planet: 'मंगल', metal: 'तांबा / सोना', finger: 'अनामिका (Ring)', day: 'मंगलवार', mantra: 'ॐ भौमाय नमः' },
    punyaGem: { nameHindi: 'पुखराज (Yellow Sapphire)', planet: 'बृहस्पति', metal: 'सोना', finger: 'तर्जनी (Index)', day: 'गुरुवार', mantra: 'ॐ गुरवे नमः' },
    prohibitedGems: ['नीलम', 'हीरा', 'गोमेद'],
    rudraksha: { mukhi: '१२ मुखी रुद्राक्ष', deity: 'भगवान सूर्य', planet: 'सूर्य', benefitHindi: 'नेतृत्व, यश, आत्मबल एवं प्रशासनिक विजय' },
  },
  {
    lagnaIndex: 5, lagnaHindi: 'कन्या', lagnaLord: 'बुध',
    lifeGem: { nameHindi: 'पन्ना (Emerald)', planet: 'बुध', metal: 'सोना / चांदी', finger: 'कनिष्ठिका', day: 'बुधवार', mantra: 'ॐ बुधाय नमः' },
    luckyGem: { nameHindi: 'हीरा / ओपल', planet: 'शुक्र', metal: 'चांदी', finger: 'मध्यमा', day: 'शुक्रवार', mantra: 'ॐ शुक्राय नमः' },
    punyaGem: { nameHindi: 'नीलम (Blue Sapphire)', planet: 'शनि', metal: 'पंचधातु', finger: 'मध्यमा', day: 'शनिवार', mantra: 'ॐ शनये नमः' },
    prohibitedGems: ['मूंगा', 'माणिक्य', 'पुखराज'],
    rudraksha: { mukhi: '४ मुखी रुद्राक्ष', deity: 'ब्रह्मा', planet: 'बुध', benefitHindi: 'स्मरण शक्ति, विद्या एवं निर्णय क्षमता' },
  },
  {
    lagnaIndex: 6, lagnaHindi: 'तुला', lagnaLord: 'शुक्र',
    lifeGem: { nameHindi: 'हीरा / सफेद पुखराज', planet: 'शुक्र', metal: 'चांदी', finger: 'मध्यमा', day: 'शुक्रवार', mantra: 'ॐ शुक्राय नमः' },
    luckyGem: { nameHindi: 'पन्ना (Emerald)', planet: 'बुध', metal: 'सोना', finger: 'कनिष्ठिका', day: 'बुधवार', mantra: 'ॐ बुधाय नमः' },
    punyaGem: { nameHindi: 'नीलम (Blue Sapphire)', planet: 'शनि', metal: 'पंचधातु', finger: 'मध्यमा', day: 'शनिवार', mantra: 'ॐ शनये नमः' },
    prohibitedGems: ['माणिक्य', 'पुखराज', 'मूंगा'],
    rudraksha: { mukhi: '६ मुखी रुद्राक्ष', deity: 'कार्तिकेय', planet: 'शुक्र', benefitHindi: 'कला, ऐश्वर्य, आकर्षण व वैवाहिक सुख' },
  },
  {
    lagnaIndex: 7, lagnaHindi: 'वृश्चिक', lagnaLord: 'मंगल',
    lifeGem: { nameHindi: 'मूंगा (Red Coral)', planet: 'मंगल', metal: 'तांबा / सोना', finger: 'अनामिका', day: 'मंगलवार', mantra: 'ॐ भौमाय नमः' },
    luckyGem: { nameHindi: 'मोती (Pearl)', planet: 'चंद्र', metal: 'चांदी', finger: 'कनिष्ठिका', day: 'सोमवार', mantra: 'ॐ सोमाय नमः' },
    punyaGem: { nameHindi: 'पुखराज (Yellow Sapphire)', planet: 'बृहस्पति', metal: 'सोना', finger: 'तर्जनी', day: 'गुरुवार', mantra: 'ॐ बृहस्पतये नमः' },
    prohibitedGems: ['हीरा', 'पन्ना', 'नीलम'],
    rudraksha: { mukhi: '३ मुखी रुद्राक्ष', deity: 'अग्नि', planet: 'मंगल', benefitHindi: 'शत्रु पराजय, साहस व स्वास्थ्य रक्षा' },
  },
  {
    lagnaIndex: 8, lagnaHindi: 'धनु', lagnaLord: 'गुरु',
    lifeGem: { nameHindi: 'पुखराज (Yellow Sapphire)', planet: 'बृहस्पति', metal: 'सोना', finger: 'तर्जनी', day: 'गुरुवार', mantra: 'ॐ गुरवे नमः' },
    luckyGem: { nameHindi: 'माणिक्य (Ruby)', planet: 'सूर्य', metal: 'सोना', finger: 'अनामिका', day: 'रविवार', mantra: 'ॐ सूर्याय नमः' },
    punyaGem: { nameHindi: 'मूंगा (Red Coral)', planet: 'मंगल', metal: 'तांबा', finger: 'अनामिका', day: 'मंगलवार', mantra: 'ॐ भौमाय नमः' },
    prohibitedGems: ['हीरा', 'नीलम', 'पन्ना'],
    rudraksha: { mukhi: '५ मुखी रुद्राक्ष', deity: 'कालाग्नि रुद्र', planet: 'बृहस्पति', benefitHindi: 'ज्ञान, विवेक, गुरु कृपा एवं आध्यात्मिक उन्नति' },
  },
  {
    lagnaIndex: 9, lagnaHindi: 'मकर', lagnaLord: 'शनि',
    lifeGem: { nameHindi: 'नीलम (Blue Sapphire)', planet: 'शनि', metal: 'पंचधातु', finger: 'मध्यमा', day: 'शनिवार', mantra: 'ॐ शनैश्चराय नमः' },
    luckyGem: { nameHindi: 'पन्ना (Emerald)', planet: 'बुध', metal: 'सोना', finger: 'कनिष्ठिका', day: 'बुधवार', mantra: 'ॐ बुधाय नमः' },
    punyaGem: { nameHindi: 'हीरा / ओपल', planet: 'शुक्र', metal: 'चांदी', finger: 'मध्यमा', day: 'शुक्रवार', mantra: 'ॐ शुक्राय नमः' },
    prohibitedGems: ['माणिक्य', 'मोती', 'पुखराज'],
    rudraksha: { mukhi: '७ मुखी रुद्राक्ष', deity: 'महालक्ष्मी', planet: 'शनि', benefitHindi: 'धन, व्यापारिक स्थायित्व, विपत्ति निवारण' },
  },
  {
    lagnaIndex: 10, lagnaHindi: 'कुंभ', lagnaLord: 'शनि',
    lifeGem: { nameHindi: 'नीलम (Blue Sapphire)', planet: 'शनि', metal: 'पंचधातु', finger: 'मध्यमा', day: 'शनिवार', mantra: 'ॐ शनैश्चराय नमः' },
    luckyGem: { nameHindi: 'हीरा / ओपल', planet: 'शुक्र', metal: 'चांदी', finger: 'मध्यमा', day: 'शुक्रवार', mantra: 'ॐ शुक्राय नमः' },
    punyaGem: { nameHindi: 'पन्ना (Emerald)', planet: 'बुध', metal: 'सोना', finger: 'कनिष्ठिका', day: 'बुधवार', mantra: 'ॐ बुधाय नमः' },
    prohibitedGems: ['माणिक्य', 'मूंगा', 'मोती'],
    rudraksha: { mukhi: '७ मुखी / १४ मुखी', deity: 'हनुमान जी', planet: 'शनि', benefitHindi: 'कर्म सिद्धि, दीर्घायु एवं दैविक रक्षा' },
  },
  {
    lagnaIndex: 11, lagnaHindi: 'मीन', lagnaLord: 'गुरु',
    lifeGem: { nameHindi: 'पुखराज (Yellow Sapphire)', planet: 'बृहस्पति', metal: 'सोना', finger: 'तर्जनी', day: 'गुरुवार', mantra: 'ॐ गुरवे नमः' },
    luckyGem: { nameHindi: 'मूंगा (Red Coral)', planet: 'मंगल', metal: 'तांबा', finger: 'अनामिका', day: 'मंगलवार', mantra: 'ॐ भौमाय नमः' },
    punyaGem: { nameHindi: 'मोती (Pearl)', planet: 'चंद्र', metal: 'चांदी', finger: 'कनिष्ठिका', day: 'सोमवार', mantra: 'ॐ चंद्रमसे नमः' },
    prohibitedGems: ['हीरा', 'नीलम', 'गोमेद'],
    rudraksha: { mukhi: '५ मुखी रुद्राक्ष', deity: 'सदाशिव', planet: 'बृहस्पति', benefitHindi: 'शांति, संतति सुख, अध्यात्म एवं मोक्ष' },
  },
];

// 3. Vastu 8 Directions Properties
export interface VastuDirectionInfo {
  directionHindi: string;
  directionEnglish: string;
  degrees: string;
  lordDeity: string;
  rulingPlanet: string;
  elementHindi: string;
  idealRooms: string;
  colorHindi: string;
}

export const VASTU_DIRECTIONS: VastuDirectionInfo[] = [
  { directionHindi: 'पूर्व (East)', directionEnglish: 'East', degrees: '90°', lordDeity: 'इंद्र देव', rulingPlanet: 'सूर्य', elementHindi: 'अग्नि / वायु', idealRooms: 'मुख्य द्वार, अध्ययन कक्ष, बरामदा, पूर्व मुखी प्रवेश', colorHindi: 'नारंगी, पीला' },
  { directionHindi: 'आग्नेय (South-East)', directionEnglish: 'South-East', degrees: '135°', lordDeity: 'अग्नि देव', rulingPlanet: 'शुक्र', elementHindi: 'अग्नि तत्व', idealRooms: 'रसोईघर (Kitchen), विद्युत उपकरण, इन्वर्टर, गीजर', colorHindi: 'गुलाबी, हल्का लाल' },
  { directionHindi: 'दक्षिण (South)', directionEnglish: 'South', degrees: '180°', lordDeity: 'यमराज', rulingPlanet: 'मंगल', elementHindi: 'पृथ्वी / अग्नि', idealRooms: 'शयनकक्ष (भारी फर्नीचर), भंडार गृह, तिजोरी की दीवार', colorHindi: 'लाल, गेरुआ' },
  { directionHindi: 'नैऋत्य (South-West)', directionEnglish: 'South-West', degrees: '225°', lordDeity: 'निरृति (राक्षस)', rulingPlanet: 'राहु', elementHindi: 'पृथ्वी तत्व', idealRooms: 'गृहस्वामी का मुख्य शयनकक्ष (Master Bed), सीढ़ियां, सबसे भारी निर्माण', colorHindi: 'भूरा, गहरा पीला' },
  { directionHindi: 'पश्चिम (West)', directionEnglish: 'West', degrees: '270°', lordDeity: 'वरुण देव', rulingPlanet: 'शनि', elementHindi: 'वायु तत्व', idealRooms: 'भोजन कक्ष (Dining Room), अध्ययन, शौचालय, ओवरहेड वॉटर टैंक', colorHindi: 'नीला, स्लेटी' },
  { directionHindi: 'वायव्य (North-West)', directionEnglish: 'North-West', degrees: '315°', lordDeity: 'वायु देव', rulingPlanet: 'चंद्रमा', elementHindi: 'वायु तत्व', idealRooms: 'अतिथि कक्ष (Guest Room), विवाह योग्य कन्या का कमरा, वाहन पार्किंग', colorHindi: 'सफेद, क्रीम' },
  { directionHindi: 'उत्तर (North)', directionEnglish: 'North', degrees: '0° / 360°', lordDeity: 'कुबेर देव', rulingPlanet: 'बुध', elementHindi: 'जल तत्व', idealRooms: 'मुख्य द्वार, तिजोरी (उत्तर मुखी खुलना), बैठक (Drawing Room)', colorHindi: 'हरा, हल्का आसमानी' },
  { directionHindi: 'ईशान (North-East)', directionEnglish: 'North-East', degrees: '45°', lordDeity: 'भगवान शिव', rulingPlanet: 'बृहस्पति', elementHindi: 'जल तत्व (पवित्रतम)', idealRooms: 'पूजा घर (Temple), ध्यान कक्ष, भूमिगत जल स्रोत, खुला आँगन', colorHindi: 'हल्का पीला, सफेद' },
];

// 4. Daily Disha Shool (7 Weekdays Classical Travel Prohibitions)
export interface DishaShoolDayInfo {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday ... 6 = Saturday
  dayNameHindi: string;
  inauspiciousDirection: string;
  remedyBeforeTravel: string;
}

export const DISHA_SHOOL_DATA: DishaShoolDayInfo[] = [
  { dayOfWeek: 0, dayNameHindi: 'रविवार (Sunday)', inauspiciousDirection: 'पश्चिम दिशा (West)', remedyBeforeTravel: 'पान का पत्ता अथवा शुद्ध घी खाकर प्रस्थान करें।' },
  { dayOfWeek: 1, dayNameHindi: 'सोमवार (Monday)', inauspiciousDirection: 'पूर्व दिशा (East)', remedyBeforeTravel: 'दर्पण में मुख देखकर अथवा दुग्ध पान कर प्रस्थान करें।' },
  { dayOfWeek: 2, dayNameHindi: 'मंगलवार (Tuesday)', inauspiciousDirection: 'उत्तर दिशा (North)', remedyBeforeTravel: 'गुड़ अथवा मिष्ठान्न खाकर प्रस्थान करें।' },
  { dayOfWeek: 3, dayNameHindi: 'बुधवार (Wednesday)', inauspiciousDirection: 'उत्तर दिशा (North)', remedyBeforeTravel: 'साबुत धनिया अथवा तिल चबाकर प्रस्थान करें।' },
  { dayOfWeek: 4, dayNameHindi: 'गुरुवार (Thursday)', inauspiciousDirection: 'दक्षिण दिशा (South)', remedyBeforeTravel: 'दही अथवा जीरा खाकर प्रस्थान करें।' },
  { dayOfWeek: 5, dayNameHindi: 'शुक्रवार (Friday)', inauspiciousDirection: 'पश्चिम दिशा (West)', remedyBeforeTravel: 'जौ का सत्तू अथवा राई खाकर प्रस्थान करें।' },
  { dayOfWeek: 6, dayNameHindi: 'शनिवार (Saturday)', inauspiciousDirection: 'पूर्व दिशा (East)', remedyBeforeTravel: 'उड़द अथवा अदरक खाकर प्रस्थान करें।' },
];
