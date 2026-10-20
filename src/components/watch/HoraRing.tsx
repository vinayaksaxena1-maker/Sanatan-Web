import React from 'react';
import type { WatchRingSegment } from './watchRingTypes';

interface HoraRingProps {
  segments: WatchRingSegment[];
  currentMinute: number;
}

function arcPath(startMinute: number, durationMinutes: number, radius: number): string {
  const pointAt = (minute: number) => {
    const angle = (minute / 1440) * Math.PI * 2 - Math.PI / 2;
    return { x: 100 + Math.cos(angle) * radius, y: 100 + Math.sin(angle) * radius };
  };
  const start = pointAt(startMinute);
  const end = pointAt(startMinute + durationMinutes);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

export const HoraRing: React.FC<HoraRingProps> = ({ segments, currentMinute }) => {
  const active = segments.find((segment) => segment.isActive);
  const angle = (currentMinute / 1440) * Math.PI * 2 - Math.PI / 2;
  const indicatorX = 100 + Math.cos(angle) * 90;
  const indicatorY = 100 + Math.sin(angle) * 90;
  return (
    <g className="hora-ring" role="group" aria-label={`होरा चक्र${active ? ` · वर्तमान स्वामी ${active.name}` : ''}`}>
      <circle className="watch-ring-track" cx="100" cy="100" r="90" />
      {segments.map((segment, index) => (
        <path
          key={`${segment.name}-${segment.startMinute}-${index}`}
          d={arcPath(segment.startMinute, segment.durationMinutes, 90)}
          className={`watch-ring-segment${segment.isActive ? ' watch-ring-active hora-active' : ''}`}
          style={{ stroke: segment.color }}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="butt"
          aria-label={`होरा ${segment.name}${segment.isActive ? ', वर्तमान स्वामी' : ''}`}
        >
          <title>होरा: {segment.name}{segment.isActive ? ' · वर्तमान स्वामी' : ''}</title>
        </path>
      ))}
      {active && <circle className="hora-ruler-indicator" cx={indicatorX} cy={indicatorY} r="2.2"><title>वर्तमान होरा स्वामी: {active.name}</title></circle>}
    </g>
  );
};

export default HoraRing;
