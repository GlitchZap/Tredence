import { useTheme } from '../../context/ThemeProvider';

/**
 * ThemeToggle
 * Sourced/inspired by Uiverse.io
 * Pure CSS premium day/night mechanical switch
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <label className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0 peer"
        checked={isDark}
        onChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <div
        className="absolute inset-0 rounded-full transition-all duration-300
                   bg-surface-200 peer-checked:bg-surface-200
                   border border-surface-300 shadow-inner"
      />
      <div
        className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 flex items-center justify-center shadow-sm
                    ${isDark ? 'translate-x-6 bg-surface-50' : 'translate-x-0'}`}
      >
        {isDark ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-surface-500">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-500">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </div>
    </label>
  );
};

export default ThemeToggle;
