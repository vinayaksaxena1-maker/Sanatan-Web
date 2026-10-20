export type TithiPaksha = 'Shukla' | 'Krishna';

export interface TithiSpiritualData {
  day: number;
  nameHi: string;
  nameEn: string;
  deityHi: string;
  deityEn: string;
  elementHi: string;
  elementEn: string;
  energyHi: string;
  energyEn: string;
  meditationHi: string;
  meditationEn: string;
}

/** Reflective associations for exploration; traditions may vary by region and lineage. */
export const TITHI_SPIRITUAL_DATA: readonly TithiSpiritualData[] = [
  { day: 1, nameHi: 'प्रतिपदा', nameEn: 'Pratipada', deityHi: 'अग्नि', deityEn: 'Agni', elementHi: 'अग्नि · आरंभ', elementEn: 'Fire · Beginnings', energyHi: 'नई शुरुआत और संकल्प की ऊर्जा।', energyEn: 'An energy for fresh beginnings and intention.', meditationHi: 'श्वास पर ध्यान दें और आज के लिए एक सरल, स्पष्ट संकल्प चुनें।', meditationEn: 'Rest with the breath and choose one clear, simple intention for today.' },
  { day: 2, nameHi: 'द्वितीया', nameEn: 'Dwitiya', deityHi: 'ब्रह्मा', deityEn: 'Brahma', elementHi: 'पृथ्वी · स्थिरता', elementEn: 'Earth · Stability', energyHi: 'निर्माण, धैर्य और पोषण की ऊर्जा।', energyEn: 'An energy for building, patience, and nourishment.', meditationHi: 'शरीर के धरती से जुड़ाव को महसूस करें; जल्दबाज़ी के बिना आगे बढ़ें।', meditationEn: 'Feel your connection to the ground and move forward without hurry.' },
  { day: 3, nameHi: 'तृतीया', nameEn: 'Tritiya', deityHi: 'गौरी', deityEn: 'Gauri', elementHi: 'आकाश · विस्तार', elementEn: 'Space · Openness', energyHi: 'सौम्यता, अभिव्यक्ति और विस्तार की ऊर्जा।', energyEn: 'An energy for gentleness, expression, and openness.', meditationHi: 'मन में स्थान बनाएं और अपने विचारों को बिना निर्णय के देखें।', meditationEn: 'Create space in the mind and observe thoughts without judgment.' },
  { day: 4, nameHi: 'चतुर्थी', nameEn: 'Chaturthi', deityHi: 'गणेश', deityEn: 'Ganesha', elementHi: 'जल · अनुकूलन', elementEn: 'Water · Adaptability', energyHi: 'बाधाओं को समझने और सरलता खोजने की ऊर्जा।', energyEn: 'An energy for understanding obstacles and finding simplicity.', meditationHi: 'किसी एक चुनौती को देखें और पूछें: अगला सबसे सरल कदम क्या है?', meditationEn: 'Notice one challenge and ask: what is the simplest next step?' },
  { day: 5, nameHi: 'पंचमी', nameEn: 'Panchami', deityHi: 'नाग देवता', deityEn: 'Naga deities', elementHi: 'वायु · सजगता', elementEn: 'Air · Awareness', energyHi: 'सीखने, सजगता और अंतर्दृष्टि की ऊर्जा।', energyEn: 'An energy for learning, awareness, and insight.', meditationHi: 'धीमी श्वासों के साथ जिज्ञासा रखें; उत्तर को उभरने का समय दें।', meditationEn: 'Breathe slowly with curiosity and give insight time to arise.' },
  { day: 6, nameHi: 'षष्ठी', nameEn: 'Shashthi', deityHi: 'कार्तिकेय', deityEn: 'Kartikeya', elementHi: 'अग्नि · साहस', elementEn: 'Fire · Courage', energyHi: 'अनुशासन, सुरक्षा और साहस की ऊर्जा।', energyEn: 'An energy for discipline, protection, and courage.', meditationHi: 'अपने उद्देश्य को याद करें और शांत दृढ़ता के साथ उस पर टिकें।', meditationEn: 'Recall your purpose and stay with it through calm determination.' },
  { day: 7, nameHi: 'सप्तमी', nameEn: 'Saptami', deityHi: 'सूर्य', deityEn: 'Surya', elementHi: 'पृथ्वी · जीवन-शक्ति', elementEn: 'Earth · Vitality', energyHi: 'प्रकाश, स्वास्थ्य और सक्रियता की ऊर्जा।', energyEn: 'An energy for light, wellbeing, and purposeful action.', meditationHi: 'प्रकाश का स्मरण करें और कृतज्ञता के साथ अपने दिन का आरंभ करें।', meditationEn: 'Recall the light and begin your day with gratitude.' },
  { day: 8, nameHi: 'अष्टमी', nameEn: 'Ashtami', deityHi: 'दुर्गा', deityEn: 'Durga', elementHi: 'आकाश · अंतर्बल', elementEn: 'Space · Inner strength', energyHi: 'साहस, संरक्षण और आत्मबल की ऊर्जा।', energyEn: 'An energy for courage, protection, and inner strength.', meditationHi: 'स्थिर बैठें और कठिनाई के बीच अपने भीतर के धैर्य को पहचानें।', meditationEn: 'Sit steadily and recognize the patience within you during difficulty.' },
  { day: 9, nameHi: 'नवमी', nameEn: 'Navami', deityHi: 'दुर्गा · राम', deityEn: 'Durga · Rama', elementHi: 'जल · करुणा', elementEn: 'Water · Compassion', energyHi: 'पूर्णता, करुणा और धर्मनिष्ठा की ऊर्जा।', energyEn: 'An energy for completion, compassion, and integrity.', meditationHi: 'अपने कर्मों को करुणा और सत्य के प्रकाश में देखने का समय लें।', meditationEn: 'Take time to view your actions through compassion and truth.' },
  { day: 10, nameHi: 'दशमी', nameEn: 'Dashami', deityHi: 'यम', deityEn: 'Yama', elementHi: 'वायु · संतुलन', elementEn: 'Air · Balance', energyHi: 'संतुलन, मर्यादा और आगे बढ़ने की ऊर्जा।', energyEn: 'An energy for balance, boundaries, and moving forward.', meditationHi: 'जो पूरा हो चुका है उसे स्वीकारें और अगले चरण के लिए जगह बनाएं।', meditationEn: 'Acknowledge what is complete and make room for the next step.' },
  { day: 11, nameHi: 'एकादशी', nameEn: 'Ekadashi', deityHi: 'विष्णु', deityEn: 'Vishnu', elementHi: 'अग्नि · संयम', elementEn: 'Fire · Clarity', energyHi: 'आत्मचिंतन, संयम और स्पष्टता की ऊर्जा।', energyEn: 'An energy for reflection, restraint, and clarity.', meditationHi: 'मन को एक शुभ विचार पर टिकाएं; व्रत संबंधी नियम अपनी परंपरा से जानें।', meditationEn: 'Rest the mind on a wholesome thought; follow your tradition for fasting guidance.' },
  { day: 12, nameHi: 'द्वादशी', nameEn: 'Dwadashi', deityHi: 'विष्णु · सूर्य', deityEn: 'Vishnu · Surya', elementHi: 'पृथ्वी · पुनर्स्थापन', elementEn: 'Earth · Renewal', energyHi: 'पुनर्संतुलन, सेवा और कृतज्ञता की ऊर्जा।', energyEn: 'An energy for restoration, service, and gratitude.', meditationHi: 'धीरे-धीरे सामान्य दिनचर्या में लौटें और सेवा का एक अवसर चुनें।', meditationEn: 'Return gently to routine and choose one opportunity to serve.' },
  { day: 13, nameHi: 'त्रयोदशी', nameEn: 'Trayodashi', deityHi: 'शिव', deityEn: 'Shiva', elementHi: 'आकाश · रूपांतरण', elementEn: 'Space · Transformation', energyHi: 'शुद्धि, रूपांतरण और जागरूकता की ऊर्जा।', energyEn: 'An energy for renewal, transformation, and awareness.', meditationHi: 'श्वास छोड़ते समय तनाव को ढीला करें और मौन को सुनें।', meditationEn: 'Release tension with each exhale and listen to the quiet.' },
  { day: 14, nameHi: 'चतुर्दशी', nameEn: 'Chaturdashi', deityHi: 'शिव', deityEn: 'Shiva', elementHi: 'जल · विमोचन', elementEn: 'Water · Release', energyHi: 'गहन आत्मचिंतन और अनावश्यक को छोड़ने की ऊर्जा।', energyEn: 'An energy for deep reflection and letting go of what is unnecessary.', meditationHi: 'एक ऐसी बात पहचानें जिसे अब छोड़ना है; उसे करुणा से विदा करें।', meditationEn: 'Name one thing ready to be released and let it go with compassion.' },
  { day: 15, nameHi: 'पूर्णिमा', nameEn: 'Purnima', deityHi: 'चंद्र देव', deityEn: 'Chandra', elementHi: 'वायु · पूर्णता', elementEn: 'Air · Wholeness', energyHi: 'पूर्णता, कृतज्ञता और साझा करने की ऊर्जा।', energyEn: 'An energy for wholeness, gratitude, and sharing.', meditationHi: 'बीते चक्र के लिए कृतज्ञ हों और अपनी शुभता दूसरों के साथ बांटें।', meditationEn: 'Give thanks for the cycle that has passed and share your goodwill.' },
];

export function getTithiSpiritualData(day: number) {
  return TITHI_SPIRITUAL_DATA[Math.min(15, Math.max(1, day)) - 1];
}
