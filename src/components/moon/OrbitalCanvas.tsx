import React, { useMemo } from 'react';
import * as d3 from 'd3';

export interface OrbitalCanvasProps {
  phaseAngleDeg: number;
  illumination: number;
}

const WIDTH = 360;
const HEIGHT = 240;
const EARTH = { x: 182, y: 124 };
const ORBIT_X = 92;
const ORBIT_Y = 76;
const MOON_RADIUS = 25;

export const OrbitalCanvas: React.FC<OrbitalCanvasProps> = ({ phaseAngleDeg, illumination }) => {
  const angleScale = useMemo(
    () => d3.scaleLinear().domain([0, 360]).range([0, Math.PI * 2]).clamp(true),
    [],
  );
  const moonPath = useMemo(() => {
    const points = d3.range(0, 361, 6).map((angle) => {
      const radians = angleScale(angle);
      return [EARTH.x - ORBIT_X * Math.cos(radians), EARTH.y + ORBIT_Y * Math.sin(radians)] as [number, number];
    });
    return d3.line<[number, number]>().curve(d3.curveCatmullRomClosed.alpha(0.5))(points) ?? '';
  }, [angleScale]);

  const angle = angleScale(phaseAngleDeg);
  const moonX = EARTH.x - ORBIT_X * Math.cos(angle);
  const moonY = EARTH.y + ORBIT_Y * Math.sin(angle);
  const moonLabelX = moonX > EARTH.x + 45 ? moonX : moonX + 38;
  const fraction = Math.max(0, Math.min(1, illumination / 100));
  const terminatorRx = MOON_RADIUS * Math.abs(2 * fraction - 1);
  const phasePath = fraction <= 0.5
    ? `M 0 -${MOON_RADIUS} A ${MOON_RADIUS} ${MOON_RADIUS} 0 0 1 0 ${MOON_RADIUS} A ${terminatorRx} ${MOON_RADIUS} 0 0 0 0 -${MOON_RADIUS} Z`
    : `M 0 -${MOON_RADIUS} A ${MOON_RADIUS} ${MOON_RADIUS} 0 0 1 0 ${MOON_RADIUS} A ${terminatorRx} ${MOON_RADIUS} 0 0 1 0 -${MOON_RADIUS} Z`;
  const isWaning = phaseAngleDeg > 180;

  return (
    <svg className="moon-orbit-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`चंद्रमा की कक्षा में वर्तमान स्थिति, ${Math.round(illumination)} प्रतिशत प्रकाशित`}>
      <defs>
        <radialGradient id="moon-sun-glow">
          <stop offset="0%" stopColor="#fde68a" stopOpacity=".4" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moon-earth-gradient" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id="moon-shadow-gradient" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="moon-lit-gradient" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#fff9e8" />
          <stop offset="100%" stopColor="#d6c8a8" />
        </radialGradient>
      </defs>

      <circle cx="54" cy="124" r="44" fill="url(#moon-sun-glow)" />
      <path d={moonPath} className="moon-orbit-path" />
      <line x1="76" y1="124" x2="104" y2="124" className="moon-sun-ray" />
      <circle cx="54" cy="124" r="18" fill="#fbbf24" className="moon-sun-core" />
      <g className="moon-sun-rays" transform="translate(54 124)" aria-hidden="true">
        {d3.range(0, 360, 45).map((degree) => <line key={degree} x1="0" y1="-25" x2="0" y2="-31" transform={`rotate(${degree})`} />)}
      </g>

      <circle cx={EARTH.x} cy={EARTH.y} r="15" fill="url(#moon-earth-gradient)" className="moon-earth" />
      <path d={`M ${EARTH.x - 10} ${EARTH.y - 2} q 5 -9 10 -3 q 4 3 9 1 q -1 7 -8 10 q -6 1 -11 -8`} fill="#4ade80" opacity=".85" />
      <circle cx={EARTH.x} cy={EARTH.y} r="19" fill="none" className="moon-earth-halo" />

      <g transform={`translate(${moonX} ${moonY})`}>
        <circle r={MOON_RADIUS} fill="url(#moon-shadow-gradient)" className="moon-disc-shadow" />
        <g transform={isWaning ? 'scale(-1 1)' : undefined}>
          <path d={phasePath} fill="url(#moon-lit-gradient)" className="moon-lit-phase" />
        </g>
        <circle cx="-8" cy="-8" r="3" fill="#a99d82" opacity={fraction > 0.08 ? '.34' : '0'} />
        <circle cx="8" cy="5" r="4" fill="#a99d82" opacity={fraction > 0.08 ? '.25' : '0'} />
        <circle r={MOON_RADIUS} fill="none" className="moon-disc-outline" />
      </g>

      <text x="54" y="164" className="moon-orbit-label">सूर्य</text>
      <text x={EARTH.x} y="158" className="moon-orbit-label">पृथ्वी</text>
      <text x={moonLabelX} y={moonY + 4} className="moon-orbit-label">चंद्रमा</text>
    </svg>
  );
};

export default OrbitalCanvas;
