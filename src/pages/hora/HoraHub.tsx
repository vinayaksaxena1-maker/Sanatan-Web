/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 04: 24-Hour Planetary Hora Watch & Guidance (होरा चक्र)
 * Re-exports the unified Choghadiya & Hora luxury hub
 */

import React from 'react';
import ChoghadiyaHub from '../choghadiya/ChoghadiyaHub';

export const HoraHub: React.FC = () => {
  return <ChoghadiyaHub />;
};

export default HoraHub;
