export interface WatchRingSegment {
  name: string;
  label: string;
  startMinute: number;
  durationMinutes: number;
  color: string;
  isActive: boolean;
}

export function parseWatchTime(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  const minute = Number(match[2]);
  if (match[3].toUpperCase() === 'PM') hour += 12;
  return hour * 60 + minute;
}

export function makeWatchSegment(
  name: string,
  label: string,
  startText: string,
  endText: string,
  color: string,
  currentMinute: number
): WatchRingSegment | null {
  const startMinute = parseWatchTime(startText);
  const rawEndMinute = parseWatchTime(endText);
  if (startMinute === null || rawEndMinute === null) return null;
  let durationMinutes = rawEndMinute - startMinute;
  if (durationMinutes <= 0) durationMinutes += 1440;
  const adjustedNow = currentMinute < startMinute ? currentMinute + 1440 : currentMinute;
  return {
    name,
    label,
    startMinute,
    durationMinutes,
    color,
    isActive: adjustedNow >= startMinute && adjustedNow < startMinute + durationMinutes,
  };
}
