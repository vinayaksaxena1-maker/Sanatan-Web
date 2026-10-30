/**
 * Sanatan Web (सनातन घड़ी)
 * Utility: timeHindiFormat
 * Converts English time strings, numerals, and Panchang tags into pure Hindi Devanagari
 */

const HINDI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export const YOGA_HINDI_NAMES: Record<string, string> = {
  'vishkumbha': 'विष्कुम्भ योग',
  'preeti': 'प्रीति योग',
  'ayushman': 'आयुष्मान योग',
  'saubhagya': 'सौभाग्य योग',
  'shobhana': 'शोभन योग',
  'atiganda': 'अतिगण्ड योग',
  'sukarma': 'सुकर्मा योग',
  'dhriti': 'धृति योग',
  'shoola': 'शूल योग',
  'ganda': 'गण्ड योग',
  'vriddhi': 'वृद्धि योग',
  'dhruva': 'ध्रुव योग',
  'vyaghata': 'व्याघात योग',
  'harshana': 'हर्षण योग',
  'vajra': 'वज्र योग',
  'siddhi': 'सिद्धि योग',
  'vyatipata': 'व्यतीपात योग',
  'variyan': 'वरीयान योग',
  'parigha': 'परिघ योग',
  'shiva': 'शिव योग',
  'siddha': 'सिद्ध योग',
  'sadhya': 'साध्य योग',
  'shubha': 'शुभ योग',
  'shukla': 'शुक्ल योग',
  'brahma': 'ब्रह्म योग',
  'indra': 'इन्द्र योग',
  'vaidhriti': 'वैधृति योग',
};

/**
 * Converts any number or numeric string to Hindi Devanagari numerals
 */
export function toHindiDigits(input: number | string): string {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, (digit) => HINDI_DIGITS[parseInt(digit, 10)] || digit);
}

/**
 * Formats a single time string like "06:14 AM" or "06:41 PM" into pure Hindi
 * @param timeStr e.g. "06:14 AM"
 * @param format 'praatah_saayam' (प्रातः / सायं) | 'poorvaahn_aparaahn' (पूर्वाह्न / अपराह्न)
 */
export function formatTimeToHindi(
  timeStr?: string,
  format: 'praatah_saayam' | 'poorvaahn_aparaahn' = 'poorvaahn_aparaahn'
): string {
  if (!timeStr) return '';
  const trimmed = timeStr.trim();
  const isPM = /pm/i.test(trimmed);
  const isAM = /am/i.test(trimmed);

  // Extract raw time digits and separators
  const cleanDigits = trimmed.replace(/am|pm/gi, '').trim();
  const hindiDigits = toHindiDigits(cleanDigits);

  if (format === 'praatah_saayam') {
    if (isPM) return `${hindiDigits} सायं`;
    if (isAM) return `${hindiDigits} प्रातः`;
    return hindiDigits;
  }

  if (isPM) return `${hindiDigits} अपराह्न`;
  if (isAM) return `${hindiDigits} पूर्वाह्न`;
  return hindiDigits;
}

/**
 * Formats a time range string like "07:30 AM – 09:00 AM" into pure Hindi
 */
export function formatTimeRangeToHindi(startStr?: string, endStr?: string): string {
  if (!startStr && !endStr) return '';
  if (startStr && !endStr) {
    if (startStr.includes('-') || startStr.includes('–')) {
      const [s, e] = startStr.split(/[-–]/).map(t => t.trim());
      return `${formatTimeToHindi(s)} – ${formatTimeToHindi(e)}`;
    }
    return formatTimeToHindi(startStr);
  }
  return `${formatTimeToHindi(startStr)} – ${formatTimeToHindi(endStr)}`;
}

/**
 * Strips English parenthetical tags like "(Shubh)", "(Labh)" from Choghadiya or Muhurat names
 */
export function cleanHindiName(rawName?: string): string {
  if (!rawName) return '';
  return rawName
    .replace(/\s*\([a-zA-Z\s]+\)/g, '')
    .replace(/[a-zA-Z]/g, '')
    .trim();
}

/**
 * Converts English or raw Yoga names (e.g. "Shiva (Auspicious)") to pure Hindi
 */
export function toHindiYogaName(rawYoga?: string): string {
  if (!rawYoga) return 'हर्षण योग';
  const clean = cleanHindiName(rawYoga);
  if (/[\u0900-\u097F]/.test(clean) && !/[a-zA-Z]/.test(clean)) {
    return clean.includes('योग') ? clean : `${clean} योग`;
  }
  const cleanKey = rawYoga.split(/[\s(]/)[0].toLowerCase().trim();
  return YOGA_HINDI_NAMES[cleanKey] || `${clean} योग` || 'शुभ योग';
}
