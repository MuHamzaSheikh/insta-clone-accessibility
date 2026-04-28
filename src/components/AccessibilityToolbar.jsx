import { useState } from "react";
import { useA11y } from "../context/AccessibilityContext";

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    highContrast,
    setHighContrast,
    textSize,
    setTextSize,
    voiceAssist,
    setVoiceAssist,
  } = useA11y();

  const handleTextSizeIncrease = () => {
    setTextSize((prev) => Math.min(prev + 10, 200));
  };

  const handleTextSizeDecrease = () => {
    setTextSize((prev) => Math.max(prev - 10, 80));
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleVoiceAssist = () => {
    setVoiceAssist(!voiceAssist);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 ${highContrast ? "border-2 border-white" : ""}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close accessibility menu" : "Open accessibility menu"}
        aria-expanded={isOpen}
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 shadow-lg
          ${highContrast
            ? "bg-white text-black border-2 border-black"
            : "bg-purple-600 text-white hover:bg-purple-700"}
          focus:ring-4 focus:ring-purple-300 outline-none`}
      >
        A
      </button>

      {isOpen && (
        <div
          role="region"
          aria-label="Accessibility settings"
          className={`absolute bottom-16 right-0 p-4 rounded-lg shadow-lg space-y-4 w-64 transition-all duration-300
            ${highContrast
              ? "bg-black border-2 border-white text-white"
              : "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700"}`}
        >
          <div className="flex items-center justify-between">
            <label htmlFor="high-contrast" className="text-sm font-semibold">
              High Contrast
            </label>
            <button
              id="high-contrast"
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
              className={`relative w-12 h-6 rounded-full transition-colors focus:ring-4 focus:ring-purple-300 outline-none
                ${highContrast ? "bg-white" : "bg-gray-300 dark:bg-gray-600"}`}
            >
              <span
                className={`absolute w-5 h-5 bg-purple-600 rounded-full top-0.5 transition-transform duration-300
                  ${highContrast ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold block">Text Size: {textSize}%</label>
            <div className="flex gap-2">
              <button
                onClick={handleTextSizeDecrease}
                aria-label="Decrease text size"
                className={`flex-1 px-2 py-2 rounded font-semibold transition-colors focus:ring-4 focus:ring-purple-300 outline-none
                  ${highContrast
                    ? "bg-white text-black border-2 border-black hover:bg-gray-200"
                    : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"}`}
              >
                A-
              </button>
              <button
                onClick={handleTextSizeIncrease}
                aria-label="Increase text size"
                className={`flex-1 px-2 py-2 rounded font-semibold transition-colors focus:ring-4 focus:ring-purple-300 outline-none
                  ${highContrast
                    ? "bg-white text-black border-2 border-black hover:bg-gray-200"
                    : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"}`}
              >
                A+
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="voice-assist" className="text-sm font-semibold">
              Voice Assist
            </label>
            <button
              id="voice-assist"
              onClick={toggleVoiceAssist}
              aria-pressed={voiceAssist}
              className={`relative w-12 h-6 rounded-full transition-colors focus:ring-4 focus:ring-purple-300 outline-none
                ${voiceAssist ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`}
            >
              <span
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300
                  ${voiceAssist ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
