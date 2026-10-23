import type { ChoghadiyaInterval, HoraInterval } from '../../engine/types';

export type { ChoghadiyaInterval, HoraInterval };

export interface AnalogClockProps {
  time: Date;
  size?: number; // Size in pixels
  theme?: string;
  choghadiyaList?: ChoghadiyaInterval[];
  activeChoghadiyaIndex?: number;
  activeHora?: HoraInterval | null;
  horaList?: HoraInterval[];
  sunriseTimeStr?: string;
  sunsetTimeStr?: string;
  language?: 'English' | 'Hindi';
  onSelectChoghadiya?: (segment: ChoghadiyaInterval) => void;
  onSelectHora?: (hora: HoraInterval) => void;
  onHoverChoghadiya?: (segment: ChoghadiyaInterval | null) => void;
  onHoverHora?: (hora: HoraInterval | null) => void;
}
