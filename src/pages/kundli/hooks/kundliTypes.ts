/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Kundli Hub: Constants, Types & Devanagari Mappings
 */

export interface KundliPersonInput {
  name: string;
  gender: 'male' | 'female';
  birthDate: string; // YYYY-MM-DD
  birthHour: string; // '01' to '12'
  birthMinute: string; // '00' to '59'
  birthSecond: string; // '00' to '59'
  birthAmPm: 'AM' | 'PM';
  cityName: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
  ayanamshaSystem: 'Lahiri' | 'KP' | 'Raman';
  houseSystem: 'Sripati' | 'Placidus' | 'EqualHouse';
}

export type DivisionalVarga = 'D1' | 'D9' | 'D10' | 'D7' | 'D12' | 'D60';

export type KundliChartStyle = 'North' | 'South' | 'East';

export const DIVISIONAL_VARGAS: { id: DivisionalVarga; label: string; desc: string }[] = [
  { id: 'D1', label: 'D1 लग्न', desc: 'तनु भाव व सामान्य जीवन' },
  { id: 'D9', label: 'D9 नवमांश', desc: 'भाग्य, धर्म व जीवनसाथी' },
  { id: 'D10', label: 'D10 दशमांश', desc: 'आजीविका, कर्म व प्रतिष्ठा' },
  { id: 'D7', label: 'D7 सप्तांश', desc: 'संतान, सुख व वंश' },
  { id: 'D12', label: 'D12 द्वादशांश', desc: 'माता-पिता व पूर्वज ऋण' },
  { id: 'D60', label: 'D60 षष्ट्यंश', desc: 'सूक्ष्म प्रारब्ध व संचित कर्म' }
];

export const RASHI_NAMES_HINDI = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'
];

export const RASHI_LORDS_HINDI = [
  'मंगल', 'शुक्र', 'बुध', 'चंद्र', 'सूर्य', 'बुध',
  'शुक्र', 'मंगल', 'गुरु', 'शनि', 'शनि', 'गुरु'
];

export const PLANET_NAMES_HINDI: Record<string, string> = {
  Sun: 'सूर्य (Sun)',
  Moon: 'चंद्र (Moon)',
  Mars: 'मंगल (Mars)',
  Mercury: 'बुध (Mercury)',
  Jupiter: 'गुरु (Jupiter)',
  Venus: 'शुक्र (Venus)',
  Saturn: 'शनि (Saturn)',
  Rahu: 'राहु (Rahu)',
  Ketu: 'केतु (Ketu)',
  Ascendant: 'लग्न (Lagna)'
};

export const HOUSE_TITLES_HINDI = [
  { no: 1, name: 'तनु भाव (Lagna)', sig: 'शरीर, व्यक्तित्व, स्वास्थ्य' },
  { no: 2, name: 'धन भाव (Wealth)', sig: 'कुटुंब, वाणी, संचित धन' },
  { no: 3, name: 'सहज भाव (Brothers)', sig: 'पराक्रम, छोटे भाई-बहन, साहस' },
  { no: 4, name: 'सुख भाव (Happiness)', sig: 'माता, भूमि, भवन, वाहन' },
  { no: 5, name: 'सुत भाव (Children)', sig: 'संतान, बुद्धि, पूर्वपुण्य' },
  { no: 6, name: 'रिपु भाव (Enemies)', sig: 'रोग, ऋण, शत्रु, प्रतियोगिता' },
  { no: 7, name: 'जाया भाव (Spouse)', sig: 'विवाह, साझेदारी, काम' },
  { no: 8, name: 'आयु भाव (Longevity)', sig: 'मृत्यु, गुप्त ज्ञान, संकट' },
  { no: 9, name: 'धर्म भाव (Fortune)', sig: 'भाग्य, गुरु, धर्म, तीर्थ' },
  { no: 10, name: 'कर्म भाव (Profession)', sig: 'पिता, व्यवसाय, पद-प्रतिष्ठा' },
  { no: 11, name: 'आय भाव (Income)', sig: 'लाभ, मित्र, कामना पूर्ति' },
  { no: 12, name: 'व्यय भाव (Loss/Moksha)', sig: 'मोक्ष, विदेश यात्रा, दान' }
];

export const DEFAULT_NATIVE_INPUT: KundliPersonInput = {
  name: 'आदित्य शर्मा',
  gender: 'male',
  birthDate: '1995-08-15',
  birthHour: '06',
  birthMinute: '45',
  birthSecond: '00',
  birthAmPm: 'AM',
  cityName: 'वाराणसी (काशी)',
  latitude: 25.3176,
  longitude: 82.9739,
  timezoneOffset: 5.5,
  ayanamshaSystem: 'Lahiri',
  houseSystem: 'Sripati'
};
