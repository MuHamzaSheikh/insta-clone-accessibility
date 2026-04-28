/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(100); // Percentage
  const [voiceAssist, setVoiceAssist] = useState(true);

  const speak = (message, options = {}) => {
    const { force = false } = options;

    if (
      (!voiceAssist && !force) ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  const announce = (message) => {
    speak(message);
  };

  return (
    <AccessibilityContext.Provider value={{ 
      highContrast, setHighContrast, 
      textSize, setTextSize, 
      announce, speak, voiceAssist, setVoiceAssist 
    }}>
      <div 
        className={`${highContrast ? 'high-contrast-theme' : 'standard-theme'}`}
        style={{ fontSize: `${textSize}%` }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useA11y = () => useContext(AccessibilityContext);
