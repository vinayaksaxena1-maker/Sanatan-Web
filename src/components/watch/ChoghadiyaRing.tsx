import React from 'react';
import type { WatchRingSegment } from './watchRingTypes';

interface ChoghadiyaRingProps {
  segments: WatchRingSegment[];
}

function arcPath(startMinute: number, durationMinutes: number, radius: number): string {
  const pointAt = (minute: number) => {
    const angle = (minute / 1440) * Math.PI * 2 - Math.PI / 2;
    return { x: 100 + Math.cos(angle) * radius, y: 100 + Math.sin(angle) * radius };
  };
  const start = pointAt(startMinute);
  const end = pointAt(startMinute + durationMinutes);
  const largeArc = durationMinutes > 720 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export const ChoghadiyaRing: React.FC<ChoghadiyaRingProps> = ({ segments }) => (
  <g className="choghadiya-ring" role="group" aria-label="चौघड़िया समय चक्र">
    <circle className="watch-ring-track" cx="100" cy="100" r="97" />
    {segments.map((segment, index) => (
      <path
        key={`${segment.name}-${segment.startMinute}-${index}`}
        d={arcPath(segment.startMinute, segment.durationMinutes, 97)}
        className={`watch-ring-segment${segment.isActive ? ' watch-ring-active choghadiya-active' : ''}`}
        style={{ stroke: segment.color }}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="butt"
        aria-label={`${segment.name}${segment.isActive ? ', वर्तमान सक्रिय' : ''}`}
      >
        <title>{segment.name}{segment.isActive ? ' · वर्तमान सक्रिय' : ''}</title>
      </path>
    ))}
  </g>
);

export default ChoghadiyaRing;
