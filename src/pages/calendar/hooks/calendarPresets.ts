/**
 * Sanatan Web (सनातन घड़ी)
 * Annual Hindu 12-Month Festival & Vrat Reference Presets (विक्रम संवत २०८१-२०८२)
 * Strict < 300 lines modular standard
 */

export interface MonthFestivalsRecord {
  monthIndex: number; // 1 to 12
  hindiMasa: string;
  englishMonths: string;
  ekadashi1: { name: string; date: string; parana: string };
  ekadashi2: { name: string; date: string; parana: string };
  festivals: string;
  pradosh: string;
  sankashti: string;
  purnima: string;
  amavasya: string;
}

export const ANNUAL_12_MONTHS_DATA: MonthFestivalsRecord[] = [
  {
    monthIndex: 1,
    hindiMasa: '१. चैत्र मास',
    englishMonths: 'मार्च / अप्रैल',
    ekadashi1: { name: 'कामदा एकादशी (१९ अप्रै.)', date: '१९ अप्रैल', parana: '२० अप्रैल ०५:५१ - ०८:२४ AM' },
    ekadashi2: { name: 'वरुथिनी एकादशी (४ मई)', date: '०४ मई', parana: '०५ मई ०५:३८ - ०८:१७ AM' },
    festivals: 'नव संवत्सरारम्भ, चैत्र नवरात्र (९-१७ अप्रै.), श्री राम नवमी (१७ अप्रै.), हनुमान जयंती (२३ अप्रै.)।',
    pradosh: '६ अप्रै. (शनि), २१ अप्रै. (रवि)',
    sankashti: '२८ मार्च',
    purnima: '२३ अप्रै. (चित्रा नक्षत्र)',
    amavasya: '०८ अप्रै. (सूर्यग्रहण)',
  },
  {
    monthIndex: 2,
    hindiMasa: '२. वैशाख मास',
    englishMonths: 'अप्रैल / मई',
    ekadashi1: { name: 'मोहिनी एकादशी (१९ मई)', date: '१९ मई', parana: '२० मई ०५:२८ - ०८:११ AM' },
    ekadashi2: { name: 'अपरा एकादशी (२ जून)', date: '०२ जून', parana: '०३ जून ०५:२३ - ०८:०६ AM' },
    festivals: 'अक्षय तृतीया (१० मई - अबूझ सिद्ध मुहूर्त), नरसिंह जयंती (२१ मई), बुद्ध पूर्णिमा (२३ मई)।',
    pradosh: '५ मई, २० मई',
    sankashti: '२६ अप्रैल',
    purnima: '२३ मई (वैशाखी पूर्णिमा)',
    amavasya: '०८ मई',
  },
  {
    monthIndex: 3,
    hindiMasa: '३. ज्येष्ठ मास',
    englishMonths: 'मई / जून',
    ekadashi1: { name: 'निर्जला एकादशी (१८ जून)', date: '१८ जून', parana: '१९ जून ०५:२४ - ०७:२८ AM (महाव्रत)' },
    ekadashi2: { name: 'योगिनी एकादशी (२ जुलाई)', date: '०२ जुलाई', parana: '०३ जुलाई ०५:२८ - ०८:०५ AM' },
    festivals: 'वट सावित्री व्रत (६ जून / अमावस्या), गंगा दशहरा (१६ जून), निर्जला महाकुंभ पर्व।',
    pradosh: '३ जून, १९ जून',
    sankashti: '२५ मई',
    purnima: '२१ जून (ज्येष्ठ पूर्णिमा)',
    amavasya: '०६ जून (वट सावित्री)',
  },
  {
    monthIndex: 4,
    hindiMasa: '४. आषाढ़ मास',
    englishMonths: 'जून / जुलाई',
    ekadashi1: { name: 'देवशयनी एकादशी (१७ जुल.)', date: '१७ जुलाई', parana: '१८ जुलाई ०५:३४ - ०८:१९ AM (चातुर्मासारम्भ)' },
    ekadashi2: { name: 'कामिका एकादशी (३१ जुल.)', date: '३१ जुलाई', parana: '०१ अगस्त ०५:४३ - ०८:२४ AM' },
    festivals: 'श्री जगन्नाथ रथयात्रा (७ जुलाई), गुरु पूर्णिमा / महर्षि व्यास पूजन (२१ जुलाई)।',
    pradosh: '३ जुलाई, १८ जुलाई',
    sankashti: '२४ जून',
    purnima: '२१ जुलाई (गुरु पूर्णिमा)',
    amavasya: '०५ जुलाई',
  },
  {
    monthIndex: 5,
    hindiMasa: '५. श्रावण मास',
    englishMonths: 'जुलाई / अगस्त',
    ekadashi1: { name: 'पुत्रदा एकादशी (१६ अग.)', date: '१६ अगस्त', parana: '१७ अगस्त ०५:५१ - ०८:२२ AM' },
    ekadashi2: { name: 'अजा एकादशी (२९ अग.)', date: '२९ अगस्त', parana: '३० अगस्त ०५:५८ - ०८:३१ AM' },
    festivals: 'श्रावण सोमवार, मंगला गौरी, नाग पंचमी (९ अगस्त), रक्षाबंधन व श्रावणी उपाकर्म (१९ अगस्त)।',
    pradosh: '१ अगस्त, १७ अगस्त',
    sankashti: '२४ जुलाई',
    purnima: '१९ अगस्त (रक्षाबंधन)',
    amavasya: '०४ अगस्त (हरियाली)',
  },
  {
    monthIndex: 6,
    hindiMasa: '६. भाद्रपद मास',
    englishMonths: 'अगस्त / सितंबर',
    ekadashi1: { name: 'परिवर्तिनी एकादशी (१४ सित.)', date: '१४ सितंबर', parana: '१५ सितंबर ०६:०५ - ०८:३४ AM' },
    ekadashi2: { name: 'इन्दिरा एकादशी (२८ सित.)', date: '२८ सितंबर', parana: '२९ सितंबर ०६:१३ - ०८:३६ AM (पितृ तर्पण)' },
    festivals: 'श्री कृष्ण जन्माष्टमी (२६ अगस्त), हरितालिका तीज (६ सित.), श्री गणेश चतुर्थी (७ सित.), अनंत चतुर्दशी (१७ सित.)।',
    pradosh: '३१ अगस्त, १५ सितंबर',
    sankashti: '२२ अगस्त',
    purnima: '१८ सित. (श्राद्धारम्भ)',
    amavasya: '०३ सित. (पिठोरी)',
  },
  {
    monthIndex: 7,
    hindiMasa: '७. आश्विन मास',
    englishMonths: 'सितंबर / अक्टूबर',
    ekadashi1: { name: 'पापांकुशा एकादशी (१३ अक्टू.)', date: '१३ अक्टूबर', parana: '१४ अक्टूबर ०६:२१ - ०८:४० AM' },
    ekadashi2: { name: 'रमा एकादशी (२८ अक्टू.)', date: '२८ अक्टूबर', parana: '२९ अक्टूबर ०६:३० - ०८:४५ AM' },
    festivals: 'सर्वपितृ अमावस्या (२ अक्टू.), शारदीय नवरात्र घटस्थापना (३ अक्टू.), विजयादशमी/दशहरा (१२ अक्टू.), शरद पूर्णिमा (१६ अक्टू.)।',
    pradosh: '१५ अक्टूबर, २९ अक्टूबर',
    sankashti: '२१ सितंबर',
    purnima: '१६ अक्टूबर (शरद पूर्णिमा)',
    amavasya: '०२ अक्टूबर (सर्वपितृ)',
  },
  {
    monthIndex: 8,
    hindiMasa: '८. कार्तिक मास',
    englishMonths: 'अक्टूबर / नवंबर',
    ekadashi1: { name: 'देवउठनी/प्रबोधिनी (१२ नव.)', date: '१२ नवंबर', parana: '१३ नवंबर ०६:४१ - ०८:५१ AM (चातुर्मास समाप्ति)' },
    ekadashi2: { name: 'उत्पन्ना एकादशी (२६ नव.)', date: '२६ नवंबर', parana: '२७ नवंबर ०६:५३ - ०८:५९ AM' },
    festivals: 'धनतेरस (२९ अक्टू.), दीपावली (१ नव.), गोवर्धन/अन्नकूट (२ नव.), भाईदूज (३ नव.), छठ पूजा (७ नव.), देव दीपावली (१५ नव.)।',
    pradosh: '१३ नवंबर, २८ नवंबर',
    sankashti: '२० अक्टूबर',
    purnima: '१५ नवंबर (देव दीपावली)',
    amavasya: '०१ नवंबर (महालक्ष्मी पूजा)',
  },
  {
    monthIndex: 9,
    hindiMasa: '९. मार्गशीर्ष मास',
    englishMonths: 'नवंबर / दिसंबर',
    ekadashi1: { name: 'मोक्षदा एकादशी (११ दिसं.)', date: '११ दिसंबर', parana: '१२ दिसंबर ०७:०४ - ०९:०९ AM (गीता जयंती)' },
    ekadashi2: { name: 'सफला एकादशी (२६ दिसं.)', date: '२६ दिसंबर', parana: '२७ दिसंबर ०७:१२ - ०९:१६ AM' },
    festivals: 'विवाह पंचमी (६ दिसंबर), श्रीमद्भगवद्गीता जयंती (११ दिसंबर), श्री दत्तात्रेय जयंती (१५ दिसंबर / पूर्णिमा)।',
    pradosh: '१३ दिसंबर, २८ दिसंबर',
    sankashti: '१९ नवंबर',
    purnima: '१५ दिसंबर (दत्तात्रेय)',
    amavasya: '०१ दिसंबर',
  },
  {
    monthIndex: 10,
    hindiMasa: '१०. पौष मास',
    englishMonths: 'दिसंबर / जनवरी',
    ekadashi1: { name: 'पौष पुत्रदा एकादशी (१० जन.)', date: '१० जनवरी', parana: '११ जनवरी ०७:१५ - ०९:२१ AM' },
    ekadashi2: { name: 'षटतिला एकादशी (२५ जन.)', date: '२५ जनवरी', parana: '२६ जनवरी ०७:१३ - ०९:२० AM' },
    festivals: 'मकर संक्रांति / पोंगल उत्तरायण प्रवेश (१४ जनवरी), पौष पूर्णिमा प्रयागराज कल्पवास स्नानारम्भ (१३ जनवरी)।',
    pradosh: '११ जनवरी, २६ जनवरी',
    sankashti: '१८ दिसंबर',
    purnima: '१३ जनवरी (माघ स्नान)',
    amavasya: '३० दिसंबर',
  },
  {
    monthIndex: 11,
    hindiMasa: '११. माघ मास',
    englishMonths: 'जनवरी / फरवरी',
    ekadashi1: { name: 'जया एकादशी (८ फर.)', date: '०८ फरवरी', parana: '०९ फरवरी ०७:०५ - ०९:१७ AM' },
    ekadashi2: { name: 'विजया एकादशी (२४ फर.)', date: '२४ फरवरी', parana: '२५ फरवरी ०६:५० - ०९:०९ AM' },
    festivals: 'मौनी अमावस्या (२९ जनवरी), वसंत पंचमी / सरस्वती पूजा (२ फरवरी), माघी पूर्णिमा संत रविदास जयंती (१२ फरवरी)।',
    pradosh: '१० फरवरी, २५ फरवरी',
    sankashti: '१७ जनवरी',
    purnima: '१२ फरवरी (माघी पूर्णिमा)',
    amavasya: '२९ जनवरी (मौनी अमावस्या)',
  },
  {
    monthIndex: 12,
    hindiMasa: '१२. फाल्गुन मास',
    englishMonths: 'फरवरी / मार्च',
    ekadashi1: { name: 'आमलकी एकादशी (१० मार्च)', date: '१० मार्च', parana: '११ मार्च ०६:३५ - ०८:५५ AM' },
    ekadashi2: { name: 'पापमोचिनी एकादशी (२५ मार्च)', date: '२५ मार्च', parana: '२६ मार्च ०६:१८ - ०८:४२ AM' },
    festivals: 'महाशिवरात्रि (२६ फरवरी - निशीथ व्यापिनी), होलाष्टक प्रारंभ (७ मार्च), होलिका दहन (१३ मार्च), धुलेंडी/रंगोत्सव (१४ मार्च)।',
    pradosh: '१२ मार्च, २७ मार्च',
    sankashti: '१६ फरवरी',
    purnima: '१३ मार्च (होलिका दहन)',
    amavasya: '२७ फरवरी (फाल्गुनी)',
  },
];
