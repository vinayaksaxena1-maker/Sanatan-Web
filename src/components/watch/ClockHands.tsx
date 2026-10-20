import React from 'react';

export interface ClockHandsProps {
  date: Date;
  showSeconds?: boolean;
}

export const ClockHands: React.FC<ClockHandsProps> = ({ date, showSeconds = true }) => {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  return (
    <g aria-hidden="true" className="watch-hands">
      <line className="watch-hand watch-hour" x1="100" y1="105" x2="100" y2="62" transform={`rotate(${hours * 30} 100 100)`} />
      <line className="watch-hand watch-minute" x1="100" y1="108" x2="100" y2="39" transform={`rotate(${minutes * 6} 100 100)`} />
      {showSeconds && <line className="watch-hand watch-second" x1="100" y1="119" x2="100" y2="32" style={{ animationDelay: `-${seconds}s` }} />}
      <circle className="watch-pivot" cx="100" cy="100" r="4" />
    </g>
  );
};

export default ClockHands;
