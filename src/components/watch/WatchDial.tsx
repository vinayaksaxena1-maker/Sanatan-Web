import React from 'react';
import { ClockHands } from './ClockHands';
import { ChoghadiyaRing } from './ChoghadiyaRing';
import { HoraRing } from './HoraRing';
import type { WatchRingSegment } from './watchRingTypes';

export interface WatchDialProps {
  date: Date;
  view: 'simple' | 'vedic';
  choghadiya?: WatchRingSegment[];
  hora?: WatchRingSegment[];
  currentMinute?: number;
}

const numerals = [
  { value: '12', x: 100, y: 30 }, { value: '1', x: 135, y: 39 },
  { value: '2', x: 161, y: 64 }, { value: '3', x: 171, y: 102 },
  { value: '4', x: 160, y: 139 }, { value: '5', x: 135, y: 163 },
  { value: '6', x: 100, y: 172 }, { value: '7', x: 65, y: 163 },
  { value: '8', x: 40, y: 139 }, { value: '9', x: 30, y: 102 },
  { value: '10', x: 40, y: 64 }, { value: '11', x: 65, y: 39 },
];

export const WatchDial: React.FC<WatchDialProps> = ({ date, view, choghadiya = [], hora = [], currentMinute = date.getHours() * 60 + date.getMinutes() }) => (
  <svg className="watch-dial" viewBox="0 0 200 200" role="img" aria-label={`Analog clock showing ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}${view === 'vedic' ? ', with current Choghadiya and Hora rings' : ''}`}>
    <circle className="watch-face" cx="100" cy="100" r={view === 'vedic' ? 86 : 91} />
    {view === 'vedic' && <><ChoghadiyaRing segments={choghadiya} /><HoraRing segments={hora} currentMinute={currentMinute} /></>}
    {Array.from({ length: 60 }, (_, index) => {
      const major = index % 5 === 0;
      return <line key={index} className={major ? 'watch-tick watch-tick-major' : 'watch-tick'} x1="100" y1={major ? 13 : 15} x2="100" y2={major ? 22 : 19} transform={`rotate(${index * 6} 100 100)`} />;
    })}
    <g transform={view === 'vedic' ? 'translate(18 18) scale(0.82)' : undefined}>
      {numerals.map(({ value, x, y }) => <text key={value} className="watch-numeral" x={x} y={y}>{value}</text>)}
    </g>
    <text className="watch-brand" x="100" y="73">SANATAN</text>
    <text className="watch-brand-sub" x="100" y="82">घड़ी</text>
    {view === 'vedic' && <text className="watch-date" x="100" y="133">{date.toLocaleDateString('hi-IN', { day: '2-digit', month: 'short' })}</text>}
    <ClockHands date={date} showSeconds={view === 'vedic'} />
  </svg>
);

export default WatchDial;
