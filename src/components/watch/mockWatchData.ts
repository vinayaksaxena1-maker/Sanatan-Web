import type { ChoghadiyaInterval, HoraInterval } from './watchTypes';

export const MOCK_CHOGHADIYA_LIST: ChoghadiyaInterval[] = [
  { name: 'Chal', hindiName: 'चल', type: 'Chal', quality: 'Neutral', startTime: '06:00 AM', endTime: '07:30 AM', isDay: true },
  { name: 'Labh', hindiName: 'लाभ', type: 'Labh', quality: 'Good', startTime: '07:30 AM', endTime: '09:00 AM', isDay: true },
  { name: 'Amrit', hindiName: 'अमृत', type: 'Amrit', quality: 'Excellent', startTime: '09:00 AM', endTime: '10:30 AM', isDay: true },
  { name: 'Kaal', hindiName: 'काल', type: 'Kaal', quality: 'Bad', startTime: '10:30 AM', endTime: '12:00 PM', isDay: true },
  { name: 'Shubh', hindiName: 'शुभ', type: 'Shubh', quality: 'Good', startTime: '12:00 PM', endTime: '01:30 PM', isDay: true },
  { name: 'Rog', hindiName: 'रोग', type: 'Rog', quality: 'Inauspicious', startTime: '01:30 PM', endTime: '03:00 PM', isDay: true },
  { name: 'Udveg', hindiName: 'उद्वेग', type: 'Udveg', quality: 'Inauspicious', startTime: '03:00 PM', endTime: '04:30 PM', isDay: true },
  { name: 'Chal', hindiName: 'चल', type: 'Chal', quality: 'Neutral', startTime: '04:30 PM', endTime: '06:00 PM', isDay: true },
  // Night Choghadiya
  { name: 'Rog', hindiName: 'रोग', type: 'Rog', quality: 'Inauspicious', startTime: '06:00 PM', endTime: '07:30 PM', isDay: false },
  { name: 'Kaal', hindiName: 'काल', type: 'Kaal', quality: 'Bad', startTime: '07:30 PM', endTime: '09:00 PM', isDay: false },
  { name: 'Labh', hindiName: 'लाभ', type: 'Labh', quality: 'Good', startTime: '09:00 PM', endTime: '10:30 PM', isDay: false },
  { name: 'Udveg', hindiName: 'उद्वेग', type: 'Udveg', quality: 'Inauspicious', startTime: '10:30 PM', endTime: '12:00 AM', isDay: false },
  { name: 'Shubh', hindiName: 'शुभ', type: 'Shubh', quality: 'Good', startTime: '12:00 AM', endTime: '01:30 AM', isDay: false },
  { name: 'Amrit', hindiName: 'अमृत', type: 'Amrit', quality: 'Excellent', startTime: '01:30 AM', endTime: '03:00 AM', isDay: false },
  { name: 'Chal', hindiName: 'चल', type: 'Chal', quality: 'Neutral', startTime: '03:00 AM', endTime: '04:30 AM', isDay: false },
  { name: 'Rog', hindiName: 'रोग', type: 'Rog', quality: 'Inauspicious', startTime: '04:30 AM', endTime: '06:00 AM', isDay: false },
];

export const MOCK_HORA_LIST: HoraInterval[] = [
  { number: 1, lord: 'Sun', lordHindi: 'सूर्य', startTime: '06:00 AM', endTime: '07:00 AM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-amber-100', benefits: 'आत्मबल' },
  { number: 2, lord: 'Venus', lordHindi: 'शुक्र', startTime: '07:00 AM', endTime: '08:00 AM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-pink-100', benefits: 'सौंदर्य' },
  { number: 3, lord: 'Mercury', lordHindi: 'बुध', startTime: '08:00 AM', endTime: '09:00 AM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-emerald-100', benefits: 'व्यापार' },
  { number: 4, lord: 'Moon', lordHindi: 'चन्द्र', startTime: '09:00 AM', endTime: '10:00 AM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-blue-100', benefits: 'शांति' },
  { number: 5, lord: 'Saturn', lordHindi: 'शनि', startTime: '10:00 AM', endTime: '11:00 AM', isDay: true, quality: 'Inauspicious', qualityHindi: 'अशुभ', colorClass: 'bg-purple-100', benefits: 'स्थिरता' },
  { number: 6, lord: 'Jupiter', lordHindi: 'गुरु', startTime: '11:00 AM', endTime: '12:00 PM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-yellow-100', benefits: 'ज्ञान' },
  { number: 7, lord: 'Mars', lordHindi: 'मंगल', startTime: '12:00 PM', endTime: '01:00 PM', isDay: true, quality: 'Neutral', qualityHindi: 'मध्यम', colorClass: 'bg-red-100', benefits: 'साहस' },
  { number: 8, lord: 'Sun', lordHindi: 'सूर्य', startTime: '01:00 PM', endTime: '02:00 PM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-amber-100', benefits: 'आत्मबल' },
  { number: 9, lord: 'Venus', lordHindi: 'शुक्र', startTime: '02:00 PM', endTime: '03:00 PM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-pink-100', benefits: 'सौंदर्य' },
  { number: 10, lord: 'Mercury', lordHindi: 'बुध', startTime: '03:00 PM', endTime: '04:00 PM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-emerald-100', benefits: 'व्यापार' },
  { number: 11, lord: 'Moon', lordHindi: 'चन्द्र', startTime: '04:00 PM', endTime: '05:00 PM', isDay: true, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-blue-100', benefits: 'शांति' },
  { number: 12, lord: 'Saturn', lordHindi: 'शनि', startTime: '05:00 PM', endTime: '06:00 PM', isDay: true, quality: 'Inauspicious', qualityHindi: 'अशुभ', colorClass: 'bg-purple-100', benefits: 'स्थिरता' },
  // Night 13 to 24
  { number: 13, lord: 'Jupiter', lordHindi: 'गुरु', startTime: '06:00 PM', endTime: '07:00 PM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-yellow-100', benefits: 'ज्ञान' },
  { number: 14, lord: 'Mars', lordHindi: 'मंगल', startTime: '07:00 PM', endTime: '08:00 PM', isDay: false, quality: 'Neutral', qualityHindi: 'मध्यम', colorClass: 'bg-red-100', benefits: 'साहस' },
  { number: 15, lord: 'Sun', lordHindi: 'सूर्य', startTime: '08:00 PM', endTime: '09:00 PM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-amber-100', benefits: 'आत्मबल' },
  { number: 16, lord: 'Venus', lordHindi: 'शुक्र', startTime: '09:00 PM', endTime: '10:00 PM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-pink-100', benefits: 'सौंदर्य' },
  { number: 17, lord: 'Mercury', lordHindi: 'बुध', startTime: '10:00 PM', endTime: '11:00 PM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-emerald-100', benefits: 'व्यापार' },
  { number: 18, lord: 'Moon', lordHindi: 'चन्द्र', startTime: '11:00 PM', endTime: '12:00 AM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-blue-100', benefits: 'शांति' },
  { number: 19, lord: 'Saturn', lordHindi: 'शनि', startTime: '12:00 AM', endTime: '01:00 AM', isDay: false, quality: 'Inauspicious', qualityHindi: 'अशुभ', colorClass: 'bg-purple-100', benefits: 'स्थिरता' },
  { number: 20, lord: 'Jupiter', lordHindi: 'गुरु', startTime: '01:00 AM', endTime: '02:00 AM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-yellow-100', benefits: 'ज्ञान' },
  { number: 21, lord: 'Mars', lordHindi: 'मंगल', startTime: '02:00 AM', endTime: '03:00 AM', isDay: false, quality: 'Neutral', qualityHindi: 'मध्यम', colorClass: 'bg-red-100', benefits: 'साहस' },
  { number: 22, lord: 'Sun', lordHindi: 'सूर्य', startTime: '03:00 AM', endTime: '04:00 AM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-amber-100', benefits: 'आत्मबल' },
  { number: 23, lord: 'Venus', lordHindi: 'शुक्र', startTime: '04:00 AM', endTime: '05:00 AM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-pink-100', benefits: 'सौंदर्य' },
  { number: 24, lord: 'Mercury', lordHindi: 'बुध', startTime: '05:00 AM', endTime: '06:00 AM', isDay: false, quality: 'Auspicious', qualityHindi: 'शुभ', colorClass: 'bg-emerald-100', benefits: 'व्यापार' },
];
