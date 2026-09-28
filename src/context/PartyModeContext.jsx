import React, { createContext, useContext, useState, useEffect } from 'react';
import { playAirHorn } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

const PartyModeContext = createContext();

export function PartyModeProvider({ children }) {
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [discoSpeed, setDiscoSpeed] = useState('normal'); // slow, normal, turbo
  const [partyTheme, setPartyTheme] = useState('disco'); // disco, neon, rave, starlight

  const togglePartyMode = () => {
    setIsPartyMode(prev => {
      const next = !prev;
      if (next) {
        playAirHorn();
        triggerPrideConfetti();
      }
      return next;
    });
  };

  return (
    <PartyModeContext.Provider value={{ isPartyMode, togglePartyMode, discoSpeed, setDiscoSpeed, partyTheme, setPartyTheme }}>
      {children}
    </PartyModeContext.Provider>
  );
}

export function usePartyMode() {
  const context = useContext(PartyModeContext);
  if (!context) {
    throw new Error('usePartyMode must be used within PartyModeProvider');
  }
  return context;
}
